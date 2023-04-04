import { expect } from 'chai';
import { ethers } from 'hardhat';
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { time } from "@nomicfoundation/hardhat-network-helpers";

// Get UNIX time in seconds
const COMMIT_DATE = new Date(2023, 0, 30).getTime() / 1000;
const COMMIT_AMOUNT = ethers.utils.parseUnits("1", "gwei");

describe("Commit contract", () => {
    // Create fixture where contract is deployed
    async function deployCommitNoOracle() {
        const CommitNoOracle = await ethers.getContractFactory("CommitNoOracle");
        const commitNoOracle = await CommitNoOracle.deploy();
        await commitNoOracle.deployed();
        return commitNoOracle;
    }

    it("Should set the value of the owner variable to the deployer", async () => {
        const commitNoOracle = await loadFixture(deployCommitNoOracle);
        const deployer = await ethers.getSigners();
        const contractOwner = await commitNoOracle.owner();
        expect(contractOwner).to.eq(deployer[0].address);
    });
    describe("Commit function", () => {
        it("Should update the balance of the contract to the amount specified in commit", async () => {
            const commit = await loadFixture(deployCommitNoOracle);
            await commit.commit(COMMIT_DATE, { value: COMMIT_AMOUNT });
            const contractBalance = await ethers.provider.getBalance(commit.address);
            expect(contractBalance).to.eq(COMMIT_AMOUNT);
        });
    
        it("Should set complete by in runs array to date specified in call", async () => {
            const commit = await loadFixture(deployCommitNoOracle);
            await commit.commit(COMMIT_DATE, { value: COMMIT_AMOUNT });
            const runsCommitted = await commit.runsCommitted();
            const latestRun = await commit.Runs(runsCommitted.sub(1));
            expect(latestRun.completeBy).to.eq(COMMIT_DATE);
        });
    });
    describe("Withdraw function", () => {

        it("Should revert if withdraw is called before time specified in completeBy", async () => {
            const commit = await loadFixture(deployCommitNoOracle);
            await commit.commit(COMMIT_DATE, { value: COMMIT_AMOUNT });
            const runsCommitted = await commit.runsCommitted();
            const latestRun = await commit.Runs(runsCommitted.sub(1));
            await expect(commit.withdraw()).to.be.revertedWith("Commit time is in the future");
        });
    
        it("Should withdraw the last commit amount if the committed run was completed", async () => {
            const commit = await loadFixture(deployCommitNoOracle);
            await commit.commit(COMMIT_DATE, { value: COMMIT_AMOUNT });
            // Mine a new block with timestamp one second ahead of COMMIT TIME
            await time.increaseTo(COMMIT_DATE + 1);
            // Call withdraw
            await expect(commit.withdraw()).to.not.be.reverted;
        });

        it("Should update the balance of the owner when withdraw is called by commit amount", async () => {
            const commit = await loadFixture(deployCommitNoOracle);
            await commit.commit(COMMIT_DATE, { value: COMMIT_AMOUNT });
            // Mine a new block with timestamp one second ahead of COMMIT TIME
            await time.increaseTo(COMMIT_DATE + 1);
            // Check account balance of owner before withdraw is called
            const [deployer] = await ethers.getSigners();
            const balanceBefore = await ethers.provider.getBalance(deployer.address);
            // Call withdraw
            const tx = await commit.withdraw();
            // Check gas cost
            const txDetails = await tx.wait();
            const gasSpent = txDetails.effectiveGasPrice.mul(txDetails.cumulativeGasUsed);
            // Check balance after
            const balanceAfter = await ethers.provider.getBalance(deployer.address);
            expect(balanceBefore).to.eq(balanceAfter.sub(COMMIT_AMOUNT).add(gasSpent))
        });
    });
})
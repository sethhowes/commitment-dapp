import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";
import { Commit, Commit__factory } from "../typechain-types";

describe("Commit contract", () => {
  const TWO_DAYS_IN_FUTURE = Date.now() + 60 * 60 * 24 * 2;
  const COMMIT_AMOUNT = ethers.utils.parseEther("1.0");

  async function deployCommitFixture() {
    const Commit = await ethers.getContractFactory("Commit");
    // Deploys contract
    const commit = await Commit.deploy();
    await commit.deployed();
    return commit;
  }

  it("Should deploy the contract successfully", async () => {
    const commit = await loadFixture(deployCommitFixture);
    // Checks if contract has been deployed at an address
    expect(commit.address).to.not.eq(0);
  });

  it("Should lock up funds when a user commits to a run", async () => {
    const commit = await loadFixture(deployCommitFixture);
    // Call runCommit function
    await commit.runCommit(TWO_DAYS_IN_FUTURE, { value: COMMIT_AMOUNT });
    // Check balance
    const lockedAmount = await commit.lockedPool();
    expect(lockedAmount).to.eq(COMMIT_AMOUNT);
  });

  it("Should check if locked funds and smart contract balance are equal", async () => {
    // Load commit contract
    const commit = await loadFixture(deployCommitFixture);
    // Commit one Ether
    await commit.runCommit(TWO_DAYS_IN_FUTURE, { value: COMMIT_AMOUNT });
    // Get contract balance
    const balance = await ethers.provider.getBalance(commit.address);

    expect(balance).to.eq(await commit.lockedPool());
  });

  it("Should transfer locked funds to unlocked pool if run completed", async () => {
    // Load commit contract
    const commit = await loadFixture(deployCommitFixture);
    // Commit one Ether
    await commit.runCommit(TWO_DAYS_IN_FUTURE, { value: COMMIT_AMOUNT });
    // Validate run
    await commit.validateRun();
    expect(await commit.unlockedPool()).to.eq(COMMIT_AMOUNT);

  it("Should ", async () => {
  });
  
  });
});

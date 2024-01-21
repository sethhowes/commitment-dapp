import {ethers} from 'hardhat';

async function main() {
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const Commit = await ethers.getContractFactory("Commit");
    const commit = Commit.attach(contractAddress);
    await commit.validateRun();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
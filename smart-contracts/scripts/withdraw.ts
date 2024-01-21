import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

async function main() {
    // Get contract address
    const contractAddress = process.env.CONTRACT_ADDRESS;
    // Create contract factory
    const Commit = await ethers.getContractFactory("Commit");
    // Attach to deployed contract
    const commit = Commit.attach(contractAddress);
    // Call withdraw function
    await commit.withdraw();
    console.log("Funds were withdrawn successfully");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})
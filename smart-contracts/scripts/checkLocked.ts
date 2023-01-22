import { ethers } from "hardhat";
import * as dotenv from 'dotenv';
dotenv.config();

// Create contract factory
async function main() {
    // Contract address to connect to
    const contractAddress = process.env.CONTRACT_ADDRESS;
    // Create contract factory
    const Commit = await ethers.getContractFactory("Commit");
    // Connect to contract
    const commit = Commit.attach(contractAddress);
    // Check lockedAmount
    const lockedAmount = ethers.utils.formatEther(await commit.lockedPool());
    console.log(`There is currently ${lockedAmount} locked ether`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  
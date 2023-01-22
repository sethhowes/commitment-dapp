import { ethers } from "hardhat";
import * as dotenv from "dotenv";

// Create contract factory
async function main() {
  const SECS_FROM_NOW = Date.now() + 60;
  const COMMIT_AMOUNT = ethers.utils.parseEther("0.01");

  // Contract address to connect to
  const contractAddress = process.env.CONTRACT_ADDRESS;
  // Create contract factory
  const Commit = await ethers.getContractFactory("Commit");
  // Connect to contract
  const commit = Commit.attach(contractAddress);
  // Call runCommit function
  await commit.runCommit(SECS_FROM_NOW, { value: COMMIT_AMOUNT });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

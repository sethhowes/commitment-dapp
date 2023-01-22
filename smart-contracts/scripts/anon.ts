import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

// Create contract factory
async function main() {
  // Contract address to connect to
  const contractAddress = process.env.CONTRACT_ADDRESS;
  // Create contract factory
  const Commit = await ethers.getContractFactory("Commit");
  // Connect to contract
  const commit = Commit.attach(contractAddress);

  //await commit.requestCompleteData();

  const answer = await commit.runComplete();
  console.log(answer);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

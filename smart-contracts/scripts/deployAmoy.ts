import { ethers } from "hardhat";
import args from "./arguments";

async function main() {
  // Get contract factory
  const CommitContractFactory = await ethers.getContractFactory("CommitAmoyFunctions");
  // Deploys contract
  const commit = await CommitContractFactory.deploy(args[0], args[1]);
  // Wait until contract is deployed
  await commit.deployed();
  console.log(`Deployed at ${commit.address}`)
} 


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

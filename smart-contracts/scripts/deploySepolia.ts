import { ethers } from "hardhat";

async function main() {
  // Get contract factory
  const Commit = await ethers.getContractFactory("CommitSepolia");
  // Deploys contract
  const commit = await Commit.deploy();
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

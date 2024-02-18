import fs from "fs";
import path from "path";
import { ethers } from "hardhat";

const ROUTER_ADDRESS = "0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C"

// Initialize functions settings
const source = fs
.readFileSync(path.resolve(__dirname, "verifyStravaRun.js"))
.toString();

async function main() {
  // Get contract factory
  const Commit = await ethers.getContractFactory("CommitMumbaiFunctions");
  // Deploys contract
  const commit = await Commit.deploy(ROUTER_ADDRESS, source);
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

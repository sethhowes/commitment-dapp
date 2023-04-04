import { ethers } from 'hardhat';

async function main() {
    // Get contract factory
    const CommitNoOracle = await ethers.getContractFactory("CommitNoOracle");
    // Deploy contract
    const commitNoOracle = await CommitNoOracle.deploy();
    // Wait until deployed
    await commitNoOracle.deployed();
    // Print address where contract was deployed
    console.log(`Contract was deployed at address ${commitNoOracle.address}`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const TokenContract = await ethers.deployContract("Token");

    await TokenContract.waitForDeployment();
    console.log("TokenContract deployed to:", await TokenContract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
const { ethers } = require("hardhat");
// require("dotenv").config();
//npx hardhat run scripts/0.deployStorage.js --network wemixTestnet
async function main() {
    const StorageContract = await ethers.deployContract("Storage");

    await StorageContract.waitForDeployment();
    console.log("StorageContract deployed to:", await StorageContract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
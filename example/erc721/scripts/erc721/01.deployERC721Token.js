const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const walletPublicAddress = new ethers.Wallet(process.env.PK).address;
    console.log("walletPublicAddress >>", walletPublicAddress);
    const TokenContract = await ethers.deployContract("ERC721TOKEN",[walletPublicAddress]);
    await TokenContract.waitForDeployment();
    console.log("TokenContract deployed to:", await TokenContract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
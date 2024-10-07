const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const TokenContract = await ethers.getContractAt("Token","0x720B47c8508A9D54Fe68c190410acACc083fB2Bc");

    const transferTx = await TokenContract.transfer("0x70997970C51812dc3A010C7d01b50e0d17dc79C8",1000);
    await transferTx.wait();
    console.log("transferTx :", transferTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const TokenContract = await ethers.getContractAt("Token","0x5FbDB2315678afecb367f032d93F642f64180aa3");

    const transferTx = await TokenContract.transfer("0x5FbDB2315678afecb367f032d93F642f64180aa3",1);
    await transferTx.wait();
    console.log("transferTx :", transferTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
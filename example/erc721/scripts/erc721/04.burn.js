const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const TokenContract = await ethers.getContractAt("ERC20TOKEN","0xaf428040075E1357Eb3C3D242C6d0D15EcF64351");
    const burnAmount = 100;
    const burnAmountBI = ethers.parseUnits(`${burnAmount}`, 18);
    console.log("burnAmountBI >>", burnAmountBI);
    const burnTx = await TokenContract.burn(burnAmountBI);
    await burnTx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
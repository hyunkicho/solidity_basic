const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const TokenContract = await ethers.getContractAt("ERC1155TOKEN","0x0D1Cd8967C2DC3dC1C423b0AEa3A7e6CBbbeEe53");
    const ownerEOA = new ethers.Wallet(process.env.PK);

    // const mintTx = await TokenContract.mint(ownerEOA, 0, 100, "0x");
    // await mintTx.wait();
    // console.log("mintTx :", mintTx.hash);

    const transferTx = await TokenContract.safeTransferFrom(ownerEOA, "0x1C6934bd97e163602346270d7F5575cc8c0Dc0a2",0, 50, "0x");
    await transferTx.wait();
    console.log("transferTx :", transferTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
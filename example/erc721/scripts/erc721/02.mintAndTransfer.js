const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const TokenContract = await ethers.getContractAt("ERC721TOKEN","0xaf428040075E1357Eb3C3D242C6d0D15EcF64351");
    const ownerEOA = new ethers.Wallet(process.env.PK);

    const mintTx = await TokenContract.safeMint(ownerEOA);
    await mintTx.wait();
    console.log("mintTx :", mintTx.hash);

    const mintTx2 = await TokenContract.safeMint(ownerEOA);
    await mintTx2.wait();

    const mintTx3 = await TokenContract.safeMint(ownerEOA);
    await mintTx3.wait();

    const mintTx4 = await TokenContract.safeMint(ownerEOA);
    await mintTx4.wait();

    const transferTx = await TokenContract.transferFrom(ownerEOA,"0x42Dc4219385B814ad5e6ce1888865392a71ECa23", 1);
    await transferTx.wait();
    console.log("transferTx :", transferTx.hash);

    const transferTx1 = await TokenContract.transferFrom(ownerEOA,"0x42Dc4219385B814ad5e6ce1888865392a71ECa23", 2);
    await transferTx1.wait();
    console.log("transferTx :", transferTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
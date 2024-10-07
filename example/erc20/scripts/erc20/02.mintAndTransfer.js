const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const TokenContract = await ethers.getContractAt("ERC20TOKEN","0xaf428040075E1357Eb3C3D242C6d0D15EcF64351");
    const ownerEOA = new ethers.Wallet(process.env.PK);
    const getDecimals = await TokenContract.decimals();

    console.log("getDecimals >>", getDecimals);
    console.log("Number(getDecimals) >>", Number(getDecimals));
    console.log("ethers.parseUnits >>", ethers.parseUnits("20000",Number(getDecimals)));

    //ethers.parseUnits("토큰개수","자리수") => 해당 토큰 개수만큼 자리수 맞춰져서 0이 추가된 상태로 숫자가 나옴.
    const mintTx = await TokenContract.mint(ownerEOA, ethers.parseUnits("20000",Number(getDecimals)));
    await mintTx.wait();
    console.log("mintTx :", mintTx.hash);

    const transferTx = await TokenContract.transfer("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", ethers.parseUnits("1000",Number(getDecimals)));
    await transferTx.wait();
    console.log("transferTx :", transferTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
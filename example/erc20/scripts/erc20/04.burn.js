const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const TokenContract = await ethers.getContractAt("ERC20TOKEN","0xaf428040075E1357Eb3C3D242C6d0D15EcF64351");
    const ownerEOA = new ethers.Wallet(process.env.PK);
    const balanceOfOwner = await TokenContract.balanceOf(ownerEOA);
    console.log("balanceOfOwner : ", balanceOfOwner);
    const decimals = await TokenContract.decimals();
    // decimal 개념이 붙어서 큰 숫자를 처리할때는 숫자 자료형을 잘 맞추어서 계산을 해야 제대로 된 값이 나온다.
    // V6에서는 BigInt를 기본적으로 리턴, 그 밑 V5 버전은 BigNumber를 리턴
    const decimalWithBI = ethers.parseUnits("1",Number(decimals));
    const balanceOfOwnerBI = balanceOfOwner;
    const realBalance = balanceOfOwnerBI/decimalWithBI;
    console.log("realBalance : ", Number(realBalance));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
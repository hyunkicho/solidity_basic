const { ethers } = require("hardhat");
// require("dotenv").config();

//npx hardhat run scripts/2.retrieve.js --network wemixTestnet
async function main() {
    const StorageAddress = "0xC8FddEbB00755B34c139EC48d60fD3942Fc5140C"; //0.deploy storage를 통해 배포된 컨트렉트 주소
    const StorageContract = await ethers.getContractAt("Storage", StorageAddress);

    const retrieve = await StorageContract.retrieve();
    console.log("retrieve bignumber: ", retrieve);
    console.log("retrieve number: ", Number(retrieve));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
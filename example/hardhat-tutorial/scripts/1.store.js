const { ethers } = require("hardhat");
// require("dotenv").config();
//npx hardhat run scripts/1.store.js --network wemixTestnet

async function main() {
    const StorageAddress = "0xC8FddEbB00755B34c139EC48d60fD3942Fc5140C";//0.deploy storage를 통해 배포된 컨트렉트 주소
    const StorageContract = await ethers.getContractAt("Storage", StorageAddress);

    const storeTx = await StorageContract.store(6);
    await storeTx.wait();
    console.log("storeTx : ", storeTx);

    console.log("storeTx hash: ", storeTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
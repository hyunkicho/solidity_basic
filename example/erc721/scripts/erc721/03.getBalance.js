const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const TokenContract = await ethers.getContractAt("ERC721TOKEN","0xaf428040075E1357Eb3C3D242C6d0D15EcF64351");
    const ownerEOA = new ethers.Wallet(process.env.PK);

    //기본 조회 함수의 경우
    const ownerOfTokenID0 = await TokenContract.ownerOf(0);
    console.log("ownerOfTokenID0 : ", ownerOfTokenID0);

    //enumerable extension이 적용된 경우

    //총발행량 체크
    const totalSupply = await TokenContract.totalSupply();
    console.log("totalSupply : ", totalSupply);

    //1. 지갑이 홀딩한 NFT 목록 구하기 - 특정 지갑주소에 몇개의 nft가 있는지
    const balanceOfOwner =  await TokenContract.balanceOf(ownerEOA);
    console.log("balanceOfOwner : ", balanceOfOwner);
    //2. 지갑이 홀딩한 NFT 목록 구하기 - 특정 지갑주소에 몇개의 nft가 있는지
    const nftListOfOwner = [];
    for(i=0; i < Number(balanceOfOwner); i++) {
      const ownedTokenId = Number(await TokenContract.tokenOfOwnerByIndex(ownerEOA, i));
      console.log("ownedTokenId >>", ownedTokenId);
      nftListOfOwner.push(ownedTokenId);
    }
    console.log("nftListOfOwner : ", nftListOfOwner);

    //3. 토큰아이디로 특정 토큰의 인덱스 구하기
    const tokenByIndex0 = await TokenContract.tokenByIndex(0);
    console.log("tokenByIndex0 : ", tokenByIndex0);

    //4. tokenURI 통해서 메타데이터 가져오기
    const token0metadata = await TokenContract.tokenURI(0);
    console.log("token0metadata : ", token0metadata);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
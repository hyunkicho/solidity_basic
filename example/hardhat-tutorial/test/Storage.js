const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Storage", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployStorageFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, account1] = await ethers.getSigners();

    const StorageFactory = await ethers.getContractFactory("Storage");
    const Storage = await StorageFactory.deploy();
    console.log("✅ Storage contract deployed success : ", await Storage.getAddress());
    return { Storage, owner, account1 };
  }

  describe("Deployment", function () {
    it("Should store and retrieve right data", async function () {
      const { Storage, owner, account1 } = await loadFixture(deployStorageFixture);
      expect(await Storage.retrieve()).to.equal(Number(0));
      console.log("✅ checking retrieve number before store : ", Number(await Storage.retrieve()));
      const StoreTx6 = await Storage.store(6);
      await StoreTx6.wait();
      // Chai 라는 프레임워크에서 받아온 비교 함수, expect(비교대상A).to.equal(비교대상B)
      expect(await Storage.retrieve()).to.equal(Number(6));
      console.log("✅ checking retrieve number before after : ", Number(await Storage.retrieve()));
    });

    it("Should store many times", async function() {
      const { Storage, owner, account1 } = await loadFixture(deployStorageFixture);
      console.log("✅ Start Testing store 1,2,3 each") 
      const StoreTx1 = await Storage.store(1);
      await StoreTx1.wait();
      expect(await Storage.retrieve()).to.equal(Number(1));

      const StoreTx2 = await Storage.store(2);
      await StoreTx2.wait();
      expect(await Storage.retrieve()).to.equal(Number(2));

      const StoreTx3 = await Storage.store(3);
      await StoreTx3.wait();
      expect(await Storage.retrieve()).to.equal(Number(3));

      const StoreTx4 = await Storage.store(4);
      await StoreTx4.wait();
      expect(await Storage.retrieve()).to.equal(Number(4));
    })
  });
});

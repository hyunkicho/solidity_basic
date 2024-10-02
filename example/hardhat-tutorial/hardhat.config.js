require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100000,
      },
    },
  },
  // gasReporter: {
  //   enabled: true
  // },
  networks: {
    hardhat: {
    },
    local: {
      url: 'http://127.0.0.1:8545/',
      chainId: 31337
    },
    metatestnet: {
      url: "https://api.metadium.com/dev",
      accounts: ["40af5c417cfe501a722825ef86b235b76804d4b1799628d21039a40d90d9a416"],
      gasPrice: 101 * (10 ** 9),
      gasLimit: 10000000,
    },
    wemixTestnet: {
      url: "https://api.test.wemix.com",
      accounts: ["40af5c417cfe501a722825ef86b235b76804d4b1799628d21039a40d90d9a416"],
      gasPrice: 101 * (10 ** 9),
      gasLimit: 10000000,
    }
    //,
    // baseTestnet: {
    //   url: 'https://84532.rpc.thirdweb.com',
    //   chainId: 84532,
    //   accounts: ["Put your Private Key here"]
    // },
    // avaxTestnet: {
    //   url: 'https://api.avax-test.network/ext/C/rpc',
    //   chainId: 43113,
    //   accounts: ["Put your Private Key here"]
    // },
    // polygonTestnet: {
    //   url: 'https://80002.rpc.thirdweb.com',
    //   chainId: 80002,
    //   accounts: ["Put your Private Key here"]
    // }
  },
};

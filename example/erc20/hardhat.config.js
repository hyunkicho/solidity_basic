require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100000,
      },
    },
  },
  gasReporter: {
    enabled: true
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    local: {
      url: 'http://127.0.0.1:8545/',
      chainId: 1337
    }
  },
};

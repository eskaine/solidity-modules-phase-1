require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

// const { ACCOUNT, GOERLI_API, ETHERSCAN_API_KEY } = process.env;

module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // goerli: {
    //   url: GOERLI_API,
    //   accounts: [ACCOUNT]
    // }
  },
  // etherscan: {
  //   apiKey: ETHERSCAN_API_KEY
  // }
};

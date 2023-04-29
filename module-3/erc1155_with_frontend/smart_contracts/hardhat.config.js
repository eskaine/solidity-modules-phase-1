require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.17",
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

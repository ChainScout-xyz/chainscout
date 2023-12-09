require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.21",
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 6,
    },
    mumbai: {
      url: "https://polygon-mumbai-bor.publicnode.com	",
      accounts: [PRIVATE_KEY],
      chainId: 80001,
      blockConfirmations: 6,
    },
  }
};

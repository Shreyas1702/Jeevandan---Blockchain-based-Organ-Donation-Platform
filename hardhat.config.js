require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.20",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200, // Adjust the number of optimization runs as needed
    },
  },
  networks: {
    amoy: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
      blockGasLimit: 3000000,
    },
  },
};
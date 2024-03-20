// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // const signin = await hre.ethers.getContractFactory("register");
  // const contract = await signin.deploy();
  // await contract.waitForDeployment();
  // console.log("Address for Register :", contract.target);

  const contract2 = await hre.ethers.getContractFactory("NFT");
  const contract3 = await contract2.deploy();
  await contract3.waitForDeployment();
  console.log("Address for NFT :", contract3.target);
  //instance of contract
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

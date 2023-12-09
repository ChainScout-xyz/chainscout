
const {ethers} = require("hardhat");

async function main() {
  const contract = await ethers.getContractFactory("chainScout");
  const deployedContract = await contract.deploy("0xaA4D74cacC47aCAD1a9fd5FD6eD1f81A2E57fA17");
  await deployedContract.deployed();
  console.log(`Contract Deployed at address: ${deployedContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

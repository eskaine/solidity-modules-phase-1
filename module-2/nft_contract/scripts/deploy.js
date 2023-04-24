const hre = require("hardhat");

async function main() {
  const MyNftContract = await hre.ethers.getContractFactory("MyNftContract");
  const myNftContract = await MyNftContract.deploy();
  await myNftContract.deployed();
  console.log(`Deployed to: ${myNftContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

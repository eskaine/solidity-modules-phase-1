const hre = require("hardhat");

async function main() {
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy();
  await myToken.deployed();

  const MyNftContract = await hre.ethers.getContractFactory("MyToken");
  const myNftContract = await MyNftContract.deploy();
  await myNftContract.deployed();

  const MyAuthorityContract = await hre.ethers.getContractFactory("MyAuthorityContract");
  const myAuthorityContract = await MyAuthorityContract.deploy(myToken.address, myNftContract.address);
  await myAuthorityContract.deployed();

  const [, account1] = await ethers.getSigners();
  const value = BigInt(Math.pow(10, 18));
  
  await myAuthorityContract.connect(account1).mintToken({value});

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

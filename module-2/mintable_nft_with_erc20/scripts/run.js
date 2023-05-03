const hre = require("hardhat");

async function main() {
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy();
  await myToken.deployed();

  const MyNftContract = await hre.ethers.getContractFactory("MyNftContract");
  const myNftContract = await MyNftContract.deploy();
  await myNftContract.deployed();

  const MyAuthorityContract = await hre.ethers.getContractFactory("MyAuthorityContract");
  const myAuthorityContract = await MyAuthorityContract.deploy(myToken.address, myNftContract.address);
  await myAuthorityContract.deployed();

  const [, account1] = await ethers.getSigners();
  const weiValue = BigInt(Math.pow(10, 18));
  
  await myAuthorityContract.connect(account1).mintToken();
  const account1Balance1 = await myToken.balanceOf(account1.address);
  console.log(`Account Balance: ${Number(account1Balance1)}`);
  await myAuthorityContract.connect(account1).approveTokenTransfer();
  const event = await myAuthorityContract.connect(account1).mintNft();
  const tokenId = Number(event.value);
  const tokenOwner = await myNftContract.connect(account1).ownerOf(tokenId);
  console.log(`Account Address: ${account1.address}`);
  console.log(`Token Owner Address: ${tokenOwner}`);

  const account1Balance = await myToken.balanceOf(account1.address);
  const authorityBalance = await myToken.balanceOf(myAuthorityContract.address);
  console.log(`Account Balance: ${Number(account1Balance)}`);
  console.log(`Authority Balance: ${Number(authorityBalance)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

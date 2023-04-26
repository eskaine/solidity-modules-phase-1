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
  
  await myAuthorityContract.connect(account1).mintToken({value: weiValue});
  await myAuthorityContract.connect(account1).approveTokenTransfer();
  const event = await myAuthorityContract.connect(account1).mintNft();
  const tokenId = Number(event.value);
  await myNftContract.connect(account1).approve(myAuthorityContract.address, tokenId);
  const nftOwner = await myNftContract.connect(account1).ownerOf(tokenId);
  console.log(`NFT Owner: ${nftOwner}`);
  await myAuthorityContract.connect(account1).stakeNft(tokenId);
  const nftOwner2 = await myNftContract.connect(account1).ownerOf(tokenId);
  console.log(`NFT Owner 2: ${nftOwner2}`);

  await myAuthorityContract.connect(account1).unstakeNft(tokenId);
  const nftOwner3 = await myNftContract.connect(account1).ownerOf(tokenId);
  console.log(`NFT Owner 3: ${nftOwner3}`);

  // const accountBalance = await myToken.balanceOf(account1.address);
  // console.log(`Account Balance: ${Number(accountBalance)}`);

  // const timeout = setTimeout(async() => {
  //   await myAuthorityContract.connect(account1).claimStakingRewards();
  //   const accountBalance2 = await myToken.balanceOf(account1.address);
  //   console.log(`Account Balance 2: ${Number(accountBalance2)}`);
  //   clearInterval(timeout);
  // }, 7000);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

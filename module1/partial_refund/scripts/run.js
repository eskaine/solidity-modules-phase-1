const hre = require("hardhat");

async function main() {
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy();
  await myToken.deployed();

  const [, account1, account2] = await ethers.getSigners();
  const sellAmount = 10000;
  const value = BigInt(Math.pow(10, 21));
  
  await myToken.connect(account1).buyToken({value});
  const balanceWithDecimals = await myToken.balanceOf(account1.address);
  const balance = ethers.utils.formatEther(balanceWithDecimals);
  console.log(`Account token balance after purchase: ${balance}`);

  await myToken.connect(account1).sellBack(sellAmount);
  const balance2WithDecimals = await myToken.balanceOf(account1.address);
  const balance2 = ethers.utils.formatEther(balance2WithDecimals);
  console.log(`Account token balance after selling: ${balance2}`);

  const rebuyAmount = BigInt(5 * Math.pow(10, 18));;
  await myToken.connect(account1).buyToken({value: rebuyAmount});
  const balance3WithDecimals = await myToken.balanceOf(account1.address);
  const balance3 = ethers.utils.formatEther(balance3WithDecimals);
  console.log(`Account token balance after 2nd purchase: ${balance3}`);

  

  // await myToken.withdraw(account2.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

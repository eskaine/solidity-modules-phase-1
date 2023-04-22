const hre = require("hardhat");

async function main() {
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy();
  await myToken.deployed();

  const [, account1, account2] = await ethers.getSigners();
  const value = BigInt(Math.pow(10, 18));
  await myToken.connect(account1).buyToken({value});
  const balanceWithDecimals = await myToken.balanceOf(account1.address);
  const balance = ethers.utils.formatEther(balanceWithDecimals);
  console.log(`Account 1 Token amount: ${balance}`);

  await myToken.withdraw(account2.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

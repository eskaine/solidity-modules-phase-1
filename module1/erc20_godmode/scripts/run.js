const hre = require("hardhat");

async function main() {
  const MyGodToken = await hre.ethers.getContractFactory("MyGodToken");
  const myGodToken = await MyGodToken.deploy();
  await myGodToken.deployed();

  const specialAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const specialAddress2 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

  // mintTokensToAddress
  const mintAmount = 1000000;
  await myGodToken.mintTokensToAddress(specialAddress, mintAmount);
  const balance = await myGodToken.balanceOf(specialAddress);
  console.log({balance});

  // changeBalanceAtAddress
  const newAmount = 10000000;
  await myGodToken.changeBalanceAtAddress(specialAddress, newAmount);
  const newBalance = await myGodToken.balanceOf(specialAddress);
  console.log({newBalance});

  // authoritativeTransferFrom
  await myGodToken.authoritativeTransferFrom(specialAddress, specialAddress2);
  const specialAddressBalance = await myGodToken.balanceOf(specialAddress);
  const specialAddress2Balance = await myGodToken.balanceOf(specialAddress2);
  console.log({specialAddressBalance, specialAddress2Balance});
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

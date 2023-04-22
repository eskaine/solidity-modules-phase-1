const hre = require("hardhat");

async function main() {
  const [
    ,
    authority,
    miscAccount,
    sanctionedAccount,
  ] = await ethers.getSigners();
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(authority.address);
  await myToken.deployed();

  // Setup balance
  const amount1 = 20000;
  const sanctionedAddress = sanctionedAccount.address;
  await myToken.mint(sanctionedAddress, amount1);
  const balance1 = await myToken.balanceOf(sanctionedAddress);
  console.log(`Balance: ${balance1}`);

  // Unauthorized authority
  // await myToken.connect(miscAccount).addSanctionedAddress(sanctionedAddress);

  // Sanction account
  const transferredAmount = 2000;
  // await myToken.connect(authority).addSanctionedAddress(sanctionedAddress);
  // await myToken.connect(authority).removeSanctionedAddress(sanctionedAddress);
  await myToken.connect(sanctionedAccount).transfer(miscAccount.address, transferredAmount);
  const balance2 = await myToken.balanceOf(sanctionedAddress);
  console.log(`Balance: ${balance2}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

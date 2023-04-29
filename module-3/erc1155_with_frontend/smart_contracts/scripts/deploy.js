const hre = require("hardhat");

async function main() {
  const GameItem = await hre.ethers.getContractFactory("GameItem");
  const gameItem = await GameItem.deploy();
  await gameItem.deployed();

  console.log(`Deployed to: ${gameItem.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

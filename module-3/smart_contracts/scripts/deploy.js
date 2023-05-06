const hre = require("hardhat");

async function main() {
  const GameCollection = await hre.ethers.getContractFactory("GameCollection");
  const gameCollection = await GameCollection.deploy();
  await gameCollection.deployed();
  console.log(`Deployed to: ${gameCollection.address}`);

  const Forger = await hre.ethers.getContractFactory("Forger");
  const forger = await Forger.deploy(gameCollection.address);
  await forger.deployed();
  console.log(`Deployed to: ${forger.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

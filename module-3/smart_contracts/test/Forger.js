const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Forger Tests", function () {
    async function deployContractFixture() {
        const GameCollection = await ethers.getContractFactory("GameCollection");
        const gameCollection = await GameCollection.deploy();

        const Forger = await ethers.getContractFactory("Forger");
        const forger = await Forger.deploy(gameCollection.address);
        
        const [owner, user1, user2] = await ethers.getSigners();

        return { owner, user1, user2, forger, gameCollection };
    }

    async function preMintItems(user1, gameCollection) {
        const provider = ethers.provider;

        const userItemsIndex = [0, 1, 4];
        const itemsAmount = [3, 2, 1];

        await gameCollection.connect(user1).mint(user1.address, userItemsIndex[0], itemsAmount[0]);
        await provider.send("evm_increaseTime", [61]);
        await gameCollection.connect(user1).mint(user1.address, userItemsIndex[1], itemsAmount[1]);
        await provider.send("evm_increaseTime", [61]);
        await gameCollection.connect(user1).mint(user1.address, userItemsIndex[2], itemsAmount[2]);

        return { provider, userItemsIndex, itemsAmount };
    }

    describe("Ownership", function () {
        it("Contract owner cannot call functions", async function () {
            const { owner, forger } = await loadFixture(deployContractFixture);

            const id = 0;

            await expect(forger.connect(owner).forgeItem(id))
                .to.be.revertedWith("Owner cannot call this function!");
        });
    });

    describe("Item Trading", function () {
        it("Item traded for should have ID within range", async function () {
            const { user1, forger } = await loadFixture(deployContractFixture);

            const id = 3;
            const burnId = 2;

            await expect(forger.connect(user1).tradeItem(id, burnId))
                .to.be.revertedWith("Item is not tradable!");
        });

        it("Item should trade successfully with event emitted", async function () {
            const { user1, forger, gameCollection } = await loadFixture(deployContractFixture);
            const { userItemsIndex } = await preMintItems(user1, gameCollection);

            const id = 2;
            const burnId = userItemsIndex[0];

            await expect(forger.connect(user1).tradeItem(id, burnId))
                .to.emit(forger, "ItemTraded")
                .withArgs(user1.address, id, burnId);
        });
    });

    describe("Item Forging", function () {
        it("Item should be minted successfully with event emitted", async function () {
            const { user1, forger, gameCollection } = await loadFixture(deployContractFixture);
            const { userItemsIndex } = await preMintItems(user1, gameCollection);

            const id = 3;

            await expect(forger.connect(user1).forgeItem(id))
                .to.emit(forger, "ItemMinted")
                .withArgs(user1.address, id);
        });
    });
});

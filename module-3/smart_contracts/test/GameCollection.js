const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Game Collection Tests", function () {
    async function deployContractFixture() {
        const GameCollection = await ethers.getContractFactory("GameCollection");
        const gameCollection = await GameCollection.deploy();
        
        const [owner, user1, user2] = await ethers.getSigners();
        const collectionLength = 7;
        
        return { owner, user1, user2, gameCollection, collectionLength };
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
        it("User should not be able to execute some functions with other users' address", async function () {
            const { user1, user2, gameCollection } = await loadFixture(deployContractFixture);

            const itemIndex = 0;
            const itemAmount = 1;

            await expect(gameCollection.connect(user1).mint(user2.address, itemIndex, itemAmount))
                .to.be.revertedWith("You are not item owner!");
        });

        it("Contract owner cannot call functions", async function () {
            const { owner, gameCollection } = await loadFixture(deployContractFixture);

            await expect(gameCollection.connect(owner).getPlayerAllItems([]))
                .to.be.revertedWith("Owner cannot call this function!");
        });
    });

    describe("URI", function () {
        it("Should return url string ending with {id}.json", async function () {
            const { gameCollection } = await loadFixture(deployContractFixture);

            const id = 1;
            const res = await gameCollection.uri(id);
            const strings = res.split("/");

            await expect(strings.pop())
                .to.be.equals(`${id}.json`);
        });
    });

    describe("Get all items of user", function () {
        it("User should not be able to fetch data of other users", async function () {
            const { user1, user2, gameCollection, collectionLength } = await loadFixture(deployContractFixture);

            const addresses = new Array(collectionLength).fill(user2.address);

            await expect(gameCollection.connect(user1).getPlayerAllItems(addresses))
                .to.be.revertedWith("Invalid addresses!");
        });

        it("User should fetch all personal data", async function () {
            const { user1, gameCollection, collectionLength } = await loadFixture(deployContractFixture);
            const { userItemsIndex, itemsAmount } = await preMintItems(user1, gameCollection);

            const addresses = new Array(collectionLength).fill(user1.address);
            let values = new Array(collectionLength).fill(ethers.BigNumber.from(0));
            userItemsIndex.forEach((v, i) => values[v] = ethers.BigNumber.from(itemsAmount[i]));

            expect(await gameCollection.connect(user1).getPlayerAllItems(addresses))
                .to.deep.equal(values);
        });
    });

    describe("Token Burn & Batch Burn", function () {
        it("Token should burn successfully", async function () {
            const { user1, gameCollection } = await loadFixture(deployContractFixture);
            const { userItemsIndex, itemsAmount } = await preMintItems(user1, gameCollection);

            const index = 0;
            const id = userItemsIndex[index];
            const amount = itemsAmount[index];
            const address = user1.address;
            const zeroAddress = ethers.constants.AddressZero;

            await expect(gameCollection.connect(user1).burn(address, id, amount))
                .to.emit(gameCollection, "TransferSingle")
                .withArgs(address, address, zeroAddress, id, amount);
        });

        it("Token should batch burn successfully", async function () {
            const { user1, gameCollection } = await loadFixture(deployContractFixture);
            const { userItemsIndex, itemsAmount } = await preMintItems(user1, gameCollection);

            const address = user1.address;
            const zeroAddress = ethers.constants.AddressZero;
            
            await expect(gameCollection.connect(user1).burnBatch(address, userItemsIndex, itemsAmount))
                .to.emit(gameCollection, "TransferBatch")
                .withArgs(address, address, zeroAddress, userItemsIndex, itemsAmount);
        });
    });

    describe("Token Mint", function () {
        it("User should not be able to mint items from id 0 to 2 consecutively within a min", async function () {
            const { user1, gameCollection } = await loadFixture(deployContractFixture);

            const itemIndex = 0;
            const itemAmount = 1;
            const elapsedTimeString = "1";

            await gameCollection.connect(user1).mint(user1.address, itemIndex, itemAmount);

            await expect(gameCollection.connect(user1).mint(user1.address, itemIndex, itemAmount))
                .to.be.revertedWith(elapsedTimeString);
        });

        it("User should be able to mint items from id 0 to 2 after waiting for a min", async function () {
            const { user1, gameCollection } = await loadFixture(deployContractFixture);
            const provider = ethers.provider;

            const id = 0;
            const amount = 1;
            const address = user1.address;
            const zeroAddress = ethers.constants.AddressZero;

            await gameCollection.connect(user1).mint(address, id, amount);
            await provider.send("evm_increaseTime", [61]);

            await expect(gameCollection.connect(user1).mint(address, id, amount))
                .to.emit(gameCollection, "TransferSingle")
                .withArgs(address, zeroAddress, address, id, amount);
        });
    });
});

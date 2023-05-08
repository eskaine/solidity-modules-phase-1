const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

const TEST_NOT_OWNER = "Contract owner should not be able to call this function";
const ERROR_NOT_OWNER = "Owner cannot call this function!";
const ERROR_NOT_ITEM_OWNER = "You are not item owner!";

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
        it(TEST_NOT_OWNER, async function () {
            const { owner, gameCollection } = await loadFixture(deployContractFixture);

            await expect(gameCollection.connect(owner).getPlayerAllItems([]))
                .to.be.revertedWith(ERROR_NOT_OWNER);
        });

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

    describe("Token Burn", function () {
        async function burnItem(operator, from, gameCollection) {
            const { userItemsIndex, itemsAmount } = await preMintItems(from, gameCollection);

            const index = 0;
            const id = userItemsIndex[index];
            const amount = itemsAmount[index];

            return gameCollection.connect(operator).burn(from.address, id, amount);
        }

        it(TEST_NOT_OWNER, async function () {
            const { owner, user1, gameCollection } = await loadFixture(deployContractFixture);

            await expect(burnItem(owner, user1, gameCollection))
                .to.be.revertedWith(ERROR_NOT_OWNER);
        });

        it("User should not be able to burn item of other users", async function () {
            const { user1, user2, gameCollection } = await loadFixture(deployContractFixture);
            
            await expect(burnItem(user2, user1, gameCollection))
                .to.be.revertedWith(ERROR_NOT_ITEM_OWNER);
        });

        it("Token should burn successfully with event emitted", async function () {
            const { user1, gameCollection } = await loadFixture(deployContractFixture);
            const { userItemsIndex, itemsAmount } = await preMintItems(user1, gameCollection);

            const index = 0;
            const id = userItemsIndex[index];
            const amount = itemsAmount[index];
            const address = user1.address;
            const zeroAddress = ethers.constants.AddressZero;

            await expect(gameCollection.connect(user1).burn(user1.address, id, amount))
                .to.emit(gameCollection, "TransferSingle")
                .withArgs(address, address, zeroAddress, id, amount);
        });
    });

    describe("Token Batch Burn", function () {
        it(TEST_NOT_OWNER, async function () {
            const { owner, user1, gameCollection } = await loadFixture(deployContractFixture);
            const { userItemsIndex, itemsAmount } = await preMintItems(user1, gameCollection);

            await expect(gameCollection.connect(owner).burnBatch(user1.address, userItemsIndex, itemsAmount))
                .to.be.revertedWith(ERROR_NOT_OWNER);
        });

        it("User should not be able to batch burn items of other users", async function () {
            const { user1, user2, gameCollection } = await loadFixture(deployContractFixture);
            const { userItemsIndex, itemsAmount } = await preMintItems(user1, gameCollection);

            await expect(gameCollection.connect(user2).burnBatch(user1.address, userItemsIndex, itemsAmount))
                .to.be.revertedWith(ERROR_NOT_ITEM_OWNER);
        });

        it("Token should batch burn successfully with event emitted", async function () {
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
        async function mintItem(operator, to, gameCollection) {
            const itemIndex = 0;
            const itemAmount = 1;

            return gameCollection.connect(operator).mint(to.address, itemIndex, itemAmount);
        }

        it(TEST_NOT_OWNER, async function () {
            const { owner, user1, gameCollection } = await loadFixture(deployContractFixture);

            await expect(mintItem(owner, user1, gameCollection))
                .to.be.revertedWith(ERROR_NOT_OWNER);
        });

        it("User should not be able to mint item for other users", async function () {
            const { user1, user2, gameCollection } = await loadFixture(deployContractFixture);

            await expect(mintItem(user2, user1, gameCollection))
                .to.be.revertedWith(ERROR_NOT_ITEM_OWNER);
        });

        it("User should not be able to mint items from id 0 to 2 consecutively within a min", async function () {
            const { user1, gameCollection } = await loadFixture(deployContractFixture);

            const elapsedTimeString = "1";
            await mintItem(user1, user1, gameCollection)

            await expect(mintItem(user1, user1, gameCollection))
                .to.be.revertedWith(elapsedTimeString);
        });

        it("User should be able to mint items from id 0 to 2 after waiting for a min with event emitted", async function () {
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

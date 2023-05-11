const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("My Token Tests", function () {
    async function deployContractFixture() {
        const MyToken = await ethers.getContractFactory("MyToken");
        const myToken = await MyToken.deploy();
        
        const [owner, user1, user2] = await ethers.getSigners();

        return { owner, user1, user2, myToken };
    }

    describe("Buying Tokens", function () {
        it("Contract owner should not be able to call this function", async function () {
            const { owner, myToken } = await loadFixture(deployContractFixture);

            const value = ethers.utils.parseUnits("1", "ether");

            await expect(myToken.connect(owner).buyToken({value}))
                .to.be.revertedWith("Owner cannot call this function!");
        });

        it("Should revert if user did not provide sufficient funds", async function () {
            const { user1, myToken } = await loadFixture(deployContractFixture);

            const value = ethers.utils.parseUnits("0.1", "ether");

            await expect(myToken.connect(user1).buyToken({value}))
                .to.be.revertedWith("Not enough ether!");
        });

        it("Should revert if amount exceeds remaining supply", async function () {
            const { user1, myToken } = await loadFixture(deployContractFixture);

            const value = ethers.utils.parseUnits("5001", "ether");

            await expect(myToken.connect(user1).buyToken({value}))
                .to.be.revertedWith("Tokens not available!");
        });

        it("Should emit event on successful buying of tokens", async function () {
            const { user1, myToken } = await loadFixture(deployContractFixture);

            const value = ethers.utils.parseUnits("1", "ether");

            await expect(myToken.connect(user1).buyToken({value}))
                .to.emit(myToken, "TokenPurchased")
                .withArgs(user1.address, anyValue);
        });
    });

    describe("Tokens Sellback", function () {
        it("Contract owner should not be able to call this function", async function () {
            const { owner, myToken } = await loadFixture(deployContractFixture);

            await expect(myToken.connect(owner).sellBack(10))
                .to.be.revertedWith("Owner cannot call this function!");
        });

        it("Should revert if user does not have enough funds to pay for sellback", async function () {
            const { user1, myToken } = await loadFixture(deployContractFixture);

            await expect(myToken.connect(user1).sellBack(10))
                .to.be.revertedWith("Not enough funds!");
        });

        it("Should revert if user is selling more than their balance", async function () {
            const { user1, user2, myToken } = await loadFixture(deployContractFixture);

            // setup with users purchasing tokens
            const user1Tokens = 20;
            const value1 = ethers.utils.parseUnits("5", "ether");
            const value2 = ethers.utils.parseUnits("100", "ether");
            await myToken.connect(user1).buyToken({value: value1});
            await myToken.connect(user2).buyToken({value: value2});

            await expect(myToken.connect(user1).sellBack(user1Tokens))
                .to.be.revertedWith("Not enough balance!");
        });

        it("Should emit event on successful selling of tokens", async function () {
            const { user1, user2, myToken } = await loadFixture(deployContractFixture);

            // setup with users purchasing tokens
            const user1Tokens = 10;
            const value1 = ethers.utils.parseUnits("5", "ether");
            const value2 = ethers.utils.parseUnits("100", "ether");
            await myToken.connect(user1).buyToken({value: value1});
            await myToken.connect(user2).buyToken({value: value2});

            await expect(myToken.connect(user1).sellBack(user1Tokens))
                .to.emit(myToken, "TokenSold")
                .withArgs(user1.address, anyValue);
        });
    });

    describe("Withdrawing Tokens", function () {
        it("Should revert if address is invalid", async function () {
            const { user1, myToken } = await loadFixture(deployContractFixture);

            await expect(myToken.connect(user1).withdraw(ethers.constants.AddressZero))
                .to.be.revertedWith("Invalid address!");
        });

        it("Should revert if transaction caller is not owner", async function () {
            const { user1, myToken } = await loadFixture(deployContractFixture);

            await expect(myToken.connect(user1).withdraw(user1.address))
                .to.be.revertedWith("Not contract owner!");
        });

        it("Should revert if current supply is not exhausted yet", async function () {
            const { owner, user1, myToken } = await loadFixture(deployContractFixture);

            // setup with user purchasing tokens
            const value = ethers.utils.parseUnits("1", "ether");
            await myToken.connect(user1).buyToken({value});

            await expect(myToken.connect(owner).withdraw(owner.address))
                .to.be.revertedWith("Tokens are still in circulation!");
        });

        it("Should get appropriate balance if withdraw successfully", async function () {
            const { owner, user2, myToken } = await loadFixture(deployContractFixture);

            await myToken.connect(owner).withdraw(user2.address);
            const balance = 0;

            await expect(myToken.connect(owner).withdraw(user2.address)).to.changeEtherBalances(
                [user2, myToken],
                [balance, -balance]
            );
        });
    });
});

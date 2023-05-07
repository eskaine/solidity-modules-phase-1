const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Game Collection Tests", function () {
    async function deployContractFixture() {
        const GameCollection = await ethers.getContractFactory("GameCollection");
        const gameCollection = await GameCollection.deploy();
        
        const [owner, user1, user2] = await ethers.getSigners();

        return { owner, user1, user2, gameCollection };
    }

    // describe("Owner", function () {
    //     it("Contract owner cannot call functions", async function () {
    //         const { owner, myToken } = await loadFixture(deployContractFixture);

    //         await expect(myToken.connect(owner).buyToken({value}))
    //             .to.be.revertedWith("Owner cannot call this function!");
    //     });
    // });
});

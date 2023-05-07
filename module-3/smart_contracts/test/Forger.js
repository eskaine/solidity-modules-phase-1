const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Forger Tests", function () {
    async function deployContractFixture() {
        const Forger = await ethers.getContractFactory("Forger");
        const forger = await Forger.deploy();
        
        const [owner, user1, user2] = await ethers.getSigners();

        return { owner, user1, user2, forger };
    }

    // describe("Owner", function () {
    //     it("Contract owner cannot call functions", async function () {
    //         const { owner, myToken } = await loadFixture(deployContractFixture);

    //         await expect(myToken.connect(owner).buyToken({value}))
    //             .to.be.revertedWith("Owner cannot call this function!");
    //     });
    // });
});

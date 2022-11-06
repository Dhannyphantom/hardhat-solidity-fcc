const { expect, assert } = require("chai")
const { deployments, getNamedAccounts, ethers } = require("hardhat")

describe("FundMe", () => {
    let fundMe, deployer, mockV3Aggregator
    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator")
    })

    describe("contructor", () => {
        it("sets priceFeed to the correct Aggregator price data feed", async () => {
            const expected = mockV3Aggregator.address
            const value = await fundMe.priceFeed()

            assert(expected, value)
        })
    })
})

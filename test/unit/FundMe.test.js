const { expect, assert } = require("chai")
const { deployments, getNamedAccounts, ethers } = require("hardhat")

describe("FundMe", () => {
    let fundMe,
        deployer,
        personal,
        mockV3Aggregator,
        sendValue = ethers.utils.parseEther("1")
    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        personal = (await getNamedAccounts()).personal
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)
        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer
        )
    })

    describe("contructor", () => {
        it("sets priceFeed to the correct Aggregator price data feed", async () => {
            const expected = mockV3Aggregator.address
            const value = await fundMe.priceFeed()

            assert.equal(expected, value)
        })
    })

    describe("fund", () => {
        it("Fails if you don't spend enough ETH", async () => {
            await expect(fundMe.fund()).to.be.revertedWith(
                "Minimum funding is 50USD"
            )
        })

        it("AmountToBeFunded is updated with funder's fund amount", async () => {
            const txRes = await fundMe.fund({ value: sendValue })
            await txRes.wait(1)

            const expected = await fundMe.addressToAmountFunded(deployer)

            assert.equal(sendValue.toString(), expected.toString())
        })

        it("Should add funder's address to funder's list", async () => {
            const txRes = await fundMe.fund({ value: sendValue })
            await txRes.wait(1)

            const expected = await fundMe.funders(0)

            assert.equal(expected, deployer)
        })
    })

    describe("withdraw", () => {
        it("Should fail when called by other users apart from contract owner", async () => {
            let personalFundMe = await ethers.getContract("FundMe", personal)
            expect(await personalFundMe.withdraw()).to.be.reverted()
        })
    })
})

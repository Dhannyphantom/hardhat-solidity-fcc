const { expect, assert } = require("chai")
const { deployments, getNamedAccounts, ethers } = require("hardhat")

describe("FundMe", () => {
    let fundMe,
        deployer,
        mockV3Aggregator,
        sendValue = ethers.utils.parseEther("1")
    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
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
            const value = await fundMe.getPriceFeed()

            assert.equal(expected, value)
        })
    })

    describe("fund", () => {
        it("Fails if you don't spend enough ETH", async () => {
            await expect(fundMe.fund()).to.be.revertedWithCustomError(
                fundMe,
                "FundMe__LowETH"
            )
        })

        it("AmountToBeFunded is updated with funder's fund amount", async () => {
            const txRes = await fundMe.fund({ value: sendValue })
            await txRes.wait(1)

            const expected = await fundMe.getAddressToAmountFunded(deployer)

            assert.equal(sendValue.toString(), expected.toString())
        })

        it("Should add funder's address to funder's list", async () => {
            const txRes = await fundMe.fund({ value: sendValue })
            await txRes.wait(1)

            const expected = await fundMe.getFunder(0)

            assert.equal(expected, deployer)
        })
    })

    describe("withdraw", () => {
        beforeEach(async () => {
            await fundMe.fund({ value: sendValue })
        })

        it("Should fail when called by other users apart from the founder", async () => {
            const accounts = await ethers.getSigners()
            const attackerFundMe = await fundMe.connect(accounts[1])
            await expect(
                attackerFundMe.withdraw()
            ).to.be.revertedWithCustomError(fundMe, "FundMe__NotOwner")
        })

        it("Should withdraw a single funder's funds to contract owner", async () => {
            const startingContractBalance = await fundMe.provider.getBalance(
                fundMe.address
            )
            const startingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            )

            const withdrawTx = await fundMe.withdraw()
            const { effectiveGasPrice, gasUsed } = await withdrawTx.wait(1)

            const endingContractBalance = await fundMe.provider.getBalance(
                fundMe.address
            )
            const endingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            )

            const gasCost = effectiveGasPrice.mul(gasUsed)

            assert.equal(endingContractBalance, 0)
            assert.equal(
                endingDeployerBalance.add(gasCost).toString(),
                startingDeployerBalance.add(startingContractBalance).toString()
            )
            // making sure the variables are set to default or empty;
            await expect(fundMe.getFunder(0)).to.be.reverted
        })

        it("Should withdraw multiple funder's funds to contract owner", async () => {
            const accounts = await ethers.getSigners()

            for (let i = 1; i < 6; i++) {
                const account = accounts[i]
                const othersFundMe = await fundMe.connect(account)

                await othersFundMe.fund({ value: sendValue })
            }

            const startingContractBalance = await fundMe.provider.getBalance(
                fundMe.address
            )
            const startingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            )

            const withdrawTx = await fundMe.withdraw()
            const { effectiveGasPrice, gasUsed } = await withdrawTx.wait(1)

            const endingContractBalance = await fundMe.provider.getBalance(
                fundMe.address
            )
            const endingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            )

            const gasCost = effectiveGasPrice.mul(gasUsed)

            assert.equal(endingContractBalance, 0)
            assert.equal(
                endingDeployerBalance.add(gasCost).toString(),
                startingDeployerBalance.add(startingContractBalance).toString()
            )
            // making sure the variables are set to default or empty;
            await expect(fundMe.getFunder(0)).to.be.reverted
            for (let i = 1; i < 6; i++) {
                const account = accounts[i]
                const fund = await fundMe.getAddressToAmountFunded(
                    account.address
                )
                assert.equal(fund, 0)
            }
        })
    })
})

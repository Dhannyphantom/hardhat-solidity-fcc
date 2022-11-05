const { assert } = require("chai")
const { ethers } = require("hardhat")

describe("SimpleStorage", () => {
    let simpleStorage
    beforeEach(async () => {
        const SimpleStorageFactory = await ethers.getContractFactory(
            "SimpleStorage"
        )
        simpleStorage = await SimpleStorageFactory.deploy()
        await simpleStorage.deployed()
    })

    it("Should start with a favorite number of 0", async () => {
        const currentValue = (await simpleStorage.retrieve()).toString()
        const expectedValue = "0"

        assert.equal(currentValue, expectedValue)
    })

    it("should update the favorite number", async () => {
        const expectedValue = "20"
        const txRes = await simpleStorage.store(expectedValue)
        await txRes.wait(1)

        const currentValue = await simpleStorage.retrieve()

        assert(currentValue, expectedValue)
    })
})

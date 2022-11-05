const { ethers } = require("hardhat")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log("Contract Deployed!")
    console.log(`Contract Address: ${simpleStorage.address}`)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

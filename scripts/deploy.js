const { ethers, run, network } = require("hardhat")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log("Contract Deployed!")
    console.log(`Contract Address: ${simpleStorage.address}`)

    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        try {
            await simpleStorage.deployTransaction.wait(6)
            await verify(simpleStorage.address, [])
        } catch (e) {
            if (e.message.toLowerCase().includes("already verified")) {
                console.log("Contract Already Verified")
            } else {
                console.error(e)
            }
        }
    }
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    await run("verify:verify", {
        address: contractAddress,
        contractArguments: args,
    })
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

const { ethers } = require("hardhat")

async function main() {
    const FundMeFactory = await ethers.getContractFactory("FundMe")

    console.log("Deploying contract...")
    const fundMe = await FundMeFactory.deploy()
    await fundMe.deployed()
    console.log("Deployed")

    const currentBalance = (await fundMe.getPrice()).toString()

    console.log(`Owner balance: ${currentBalance}`)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})

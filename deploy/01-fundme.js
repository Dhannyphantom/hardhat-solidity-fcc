const { network, ethers } = require("hardhat")
const { networkConfig, DEV_CHAINS } = require("../helper-hardhat-config")
const verify = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // DYNAMICALLY GET THE PRICE_FEED_ADDRESS BASED ON THE CHAIN ID
    let ethUsdPriceFeedAddress

    if (DEV_CHAINS.includes(network.name)) {
        // development chain, so grab address from deployed MockV3Aggregator
        const MockV3Aggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = MockV3Aggregator.address
    } else {
        // testnets or mainnets
        ethUsdPriceFeedAddress = networkConfig[chainId].ethUsdPriceFeedAddress
    }

    const args = [ethUsdPriceFeedAddress]

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args,
        log: true,
    })

    log("Deployed sucessfully")

    if (!DEV_CHAINS.includes(network.name)) {
        await verify(fundMe.address, args)
    }

    log("--------------------------------------------------------")
}

module.exports.tags = ["all", "fundme"]

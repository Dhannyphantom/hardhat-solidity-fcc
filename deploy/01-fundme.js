const { network } = require("hardhat")
const { networkConfig, DEV_CHAINS } = require("../helper-hardhat-config")

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

    await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true,
    })

    log("Deployed sucessfully")

    log("--------------------------------------------------------")
}

module.exports.tags = ["all", "fundme"]

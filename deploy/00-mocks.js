const { network } = require("hardhat")
const {
    DEV_CHAINS,
    MOCK_DECIMALS,
    MOCK_PRICE,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    console.log(network.name)

    // ONLY DEPLOY MOCKS ON DEVELOPMENT CHAINS
    if (DEV_CHAINS.includes(network.name)) {
        // a development chain, thus deploy this contract;
        log("Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            args: [MOCK_DECIMALS, MOCK_PRICE],
            log: true,
        })
        log("Mocks deployed!")
        log("---------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]

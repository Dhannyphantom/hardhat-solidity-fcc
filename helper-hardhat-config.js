const networkConfig = {
    5: {
        name: "goerli",
        ethUsdPriceFeedAddress: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },
    4: {
        name: "rinkeby",
        ethUsdPriceFeedAddress: "0xkey",
    },
}

const DEV_CHAINS = ["hardhat", "localhost"]
const MOCK_DECIMALS = 8
const MOCK_PRICE = 2000 * Math.pow(10, MOCK_DECIMALS)

module.exports = {
    networkConfig,
    DEV_CHAINS,
    MOCK_DECIMALS,
    MOCK_PRICE,
}

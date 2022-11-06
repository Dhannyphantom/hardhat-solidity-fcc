require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/getAccounts")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

/** @type import('hardhat/config').HardhatUserConfig */

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY ?? "key"
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL ?? "http://eth-goerli"
const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "0xkey"
// const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY ?? "key"

module.exports = {
    // solidity: "0.8.17",
    solidity: {
        compilers: [{ version: "0.8.17" }, { version: "0.6.6" }],
    },
    defaultNetwork: "localhost",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
        localhost: {
            url: "http://127.0.0.1:8545",
            chainId: 31337,
            // accounts: automatically populated by hardhat
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "artifacts/gas-report.txt",
        noColors: true,
        // coinmarketcap: COINMARKET_API_KEY,
        currency: "USD",
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        personal: {
            default: 1,
        },
    },
}

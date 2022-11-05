require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/getAccounts")

/** @type import('hardhat/config').HardhatUserConfig */

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
    solidity: "0.8.17",
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
}

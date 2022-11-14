import { abi, contractAddress } from './constants.js'
import { ethers } from './ethers-5.1.esm.min.js'

const connectBtn = document.getElementById('connectBtn')
const fundBtn = document.getElementById('fundBtn')
const getBalanceBtn = document.getElementById('balanceBtn')
const amountInput = document.getElementById('amount')
const withdrawBtn = document.getElementById('withdraw')
connectBtn.onclick = connect
fundBtn.onclick = fund
getBalanceBtn.onclick = getBalance
withdrawBtn.onclick = withdraw

async function connect() {
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        console.log('Connected')
        connectBtn.innerHTML = 'Connected'
    } else {
        alert('Please install metamask')
    }
}
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const contract = new ethers.Contract(contractAddress, abi, signer)

async function fund() {
    const ethAmount = amountInput.value
    if (typeof window.ethereum !== 'undefined') {
        try {
            console.log(`Funding contract with ${ethAmount}ETH`)
            const fundTx = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })
            await listenForTransactionMine(fundTx, provider)
            console.log('Funded!')
        } catch (error) {
            console.log(error)
        }
    } else {
        alert('Please install metamask')
    }
}

async function getBalance() {
    const balance = await provider.getBalance(contractAddress)
    console.log(ethers.utils.formatEther(balance))
}

async function withdraw() {
    try {
        console.log('Withdrawing ETH...')
        const withdrawTx = await contract.withdraw()
        await listenForTransactionMine(withdrawTx, provider)
    } catch (error) {
        console.log(error)
    }
}

function listenForTransactionMine(transactionRespone, provider) {
    console.log(`Mining ${transactionRespone.hash}`)
    return new Promise((resolve, reject) => {
        provider.once(transactionRespone.hash, (transactionReciept) => {
            console.log(
                `Completed with ${transactionReciept.confirmations} confirmations`
            )
            resolve()
        })
    })
}

import { abi, contractAddress } from './constants.js'
import { ethers } from './ethers-5.1.esm.min.js'

const connectBtn = document.querySelector('#connectBtn')
const fundBtn = document.querySelector('#fundBtn')
connectBtn.onclick = connect
fundBtn.onclick = fund

async function connect() {
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        console.log('Connected')
        connectBtn.innerHTML = 'Connected'
    } else {
        alert('Please install metamask')
    }
}

async function fund() {
    const ethAmount = '10'
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        console.log(`Funding contract with ${ethAmount}ETH`)
        const fundTx = await contract.fund({
            value: ethers.utils.parseEther(ethAmount),
        })
        await listenForTransactionMine(fundTx, provider)
        console.log('Funded!')
    } else {
        alert('Please install metamask')
    }
}

function listenForTransactionMine(transactionRespone, provider) {
    return new Promise((resolve, reject) => {
        provider.once(transactionRespone.hash, (transactionReciept) => {
            console.log(
                `Completed with ${transactionReciept.confirmations} confirmations`
            )
            resolve()
        })
    })
}

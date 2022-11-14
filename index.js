import { ethers } from './ethers-5.1.esm.min.js'

const connectBtn = document.querySelector('#connectBtn')
const fundBtn = document.querySelector('#fundBtn')
connectBtn.onclick = connect
fundBtn.onclick = fund

console.log(ethers)

async function connect() {
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        console.log('Connected')
        connectBtn.innerHTML = 'Connected'
    } else {
        alert('Please install metamask')
    }
}

async function fund(ethAmount) {
    if (typeof window.ethereum !== 'undefined') {
        console.log(ethAmount)
    } else {
        alert('Please install metamask')
    }
}

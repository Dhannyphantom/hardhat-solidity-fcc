export const abi = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 's_priceFeedAddress',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [],
        name: 'FundMe__LowETH',
        type: 'error',
    },
    {
        inputs: [],
        name: 'FundMe__NotOwner',
        type: 'error',
    },
    {
        inputs: [],
        name: 'fund',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_address',
                type: 'address',
            },
        ],
        name: 'getAddressToAmountFunded',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_ethAmount',
                type: 'uint256',
            },
        ],
        name: 'getConversionRate',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_index',
                type: 'uint256',
            },
        ],
        name: 'getFunder',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getPriceFeed',
        outputs: [
            {
                internalType: 'contract AggregatorV3Interface',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'i_owner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
]

export const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
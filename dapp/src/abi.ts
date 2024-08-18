export const abi_erc20 = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const


  export const abi_contratInfos = [
    {
      name: 'contractInfos',
      type: 'function',
      stateMutability: 'view',
      inputs: [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      outputs: [
        {
          "internalType": "enum CopyRight.RightType",
          "name": "rightType",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "author",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "contents",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "url",
          "type": "string"
        },
        {
          "internalType": "bytes32",
          "name": "contentsHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "updatedBlocknumber",
          "type": "uint256"
        }
      ],
    },
  ] as const

  export const abi_userContracts = [
    {
      name: 'userContracts',
      type: 'function',
      stateMutability: 'view',
      inputs: [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      outputs: [
        {
          "internalType": "uint256",
          "name": "ownedContractIds",
          "type": "uint256"
        }
      ],
    },
  ] as const

  export const abi_getContractContents = [
    {
      name: 'getContractContents',
      type: 'function',
      stateMutability: 'view',
      inputs: [
        {
          "internalType": "uint256",
          "name": "_contractId",
          "type": "uint256"
        }
      ],
      outputs: [
        {
          "internalType": "enum CopyRight.RightType",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
    },
  ] as const

export const abi_checkContractIdByAddress = [
  {
    name: 'checkContractIdByAddress',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    outputs: [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
  },
] as const
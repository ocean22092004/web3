// Minimal viem-style ABI for Transactions.sol
export const transactionsAbi = [
  {
    type: "function",
    name: "addToBlockchain",
    stateMutability: "payable",
    inputs: [
      { name: "to", type: "address" },
      { name: "message", type: "string" }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "getAllTransactions",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "tuple[]",
        components: [
          { name: "from", type: "address" },
          { name: "to", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "message", type: "string" },
          { name: "timestamp", type: "uint256" }
        ]
      }
    ]
  }
] as const;

export const erc20Abi = [
  { type: "function", name: "decimals", stateMutability: "view", inputs: [], outputs: [{ type: "uint8" }] },
  { type: "function", name: "symbol", stateMutability: "view", inputs: [], outputs: [{ type: "string" }] },
  { type: "function", name: "balanceOf", stateMutability: "view", inputs: [{ name: "a", type: "address" }], outputs: [{ type: "uint256" }] }
] as const;

export const tokenSaleAbi = [
  { type: "function", name: "rate", stateMutability: "view", inputs: [], outputs: [{ type: "uint256" }] },
  { type: "function", name: "buy",  stateMutability: "payable", inputs: [{ name: "to", type: "address" }], outputs: [] }
] as const;

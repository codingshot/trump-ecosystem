type ExplorerConfig = {
  baseUrl: string;
  addressPath: string;
  tokenPath: string;
}

export const CHAIN_EXPLORERS: Record<string, ExplorerConfig> = {
  "Solana": {
    baseUrl: "https://solscan.io",
    addressPath: "account",
    tokenPath: "token"
  },
  "Base": {
    baseUrl: "https://basescan.org",
    addressPath: "address",
    tokenPath: "token"
  },
  "NEAR": {
    baseUrl: "https://explorer.near.org",
    addressPath: "accounts",
    tokenPath: "token"
  },
  "Aptos": {
    baseUrl: "https://explorer.aptoslabs.com",
    addressPath: "account",
    tokenPath: "token"
  },
  "Sui": {
    baseUrl: "https://suiexplorer.com",
    addressPath: "address",
    tokenPath: "token"
  },
  "Tron": {
    baseUrl: "https://tronscan.org",
    addressPath: "#/address",
    tokenPath: "#/token"
  },
  "Avalanche": {
    baseUrl: "https://snowtrace.io",
    addressPath: "address",
    tokenPath: "token"
  },
  "Ethereum": {
    baseUrl: "https://etherscan.io",
    addressPath: "address",
    tokenPath: "token"
  }
}

export function getExplorerUrl(chain: string, address: string, type: 'address' | 'token' = 'address'): string {
  const explorer = CHAIN_EXPLORERS[chain]
  if (!explorer) return '#'
  
  const path = type === 'token' ? explorer.tokenPath : explorer.addressPath
  return `${explorer.baseUrl}/${path}/${address}`
} 
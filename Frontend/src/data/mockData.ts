export interface Asset {
  id: string;
  symbol: string;
  name: string;
  balance: number;
  price: number;
  change24h: number;
  change7d: number;
  change30d: number;
  value: number;
  logo: string;
  network: string;
}

export interface Transaction {
  id: string;
  type: "buy" | "sell" | "send" | "receive";
  asset: string;
  amount: number;
  price: number;
  timestamp: string;
  hash: string;
  status: "completed" | "pending" | "failed";
}

export interface Network {
  id: string;
  name: string;
  symbol: string;
  color: string;
  rpc: string;
  explorer: string;
  icon: string;
  available: boolean;
}

export const mockAssets: Asset[] = [
  {
    id: "1",
    symbol: "BTC",
    name: "Bitcoin",
    balance: 0.5234,
    price: 43250.75,
    change24h: 2.34,
    change7d: -1.67,
    change30d: 8.92,
    value: 22633.85,
    logo: "₿",
    network: "bitcoin",
  },
  {
    id: "2",
    symbol: "ETH",
    name: "Ethereum",
    balance: 3.2468,
    price: 2650.42,
    change24h: -0.89,
    change7d: 3.21,
    change30d: 12.45,
    value: 8607.32,
    logo: "Ξ",
    network: "ethereum",
  },
  {
    id: "3",
    symbol: "USDT",
    name: "Tether",
    balance: 1250.0,
    price: 1.0,
    change24h: 0.01,
    change7d: 0.02,
    change30d: -0.01,
    value: 1250.0,
    logo: "₮",
    network: "ethereum",
  },
  {
    id: "4",
    symbol: "BNB",
    name: "Binance Coin",
    balance: 12.567,
    price: 315.89,
    change24h: 1.76,
    change7d: -2.34,
    change30d: 7.23,
    value: 3970.24,
    logo: "BNB",
    network: "bsc",
  },
  {
    id: "5",
    symbol: "ADA",
    name: "Cardano",
    balance: 2450.5,
    price: 0.485,
    change24h: 3.45,
    change7d: 8.92,
    change30d: -4.67,
    value: 1188.49,
    logo: "ADA",
    network: "cardano",
  },
  {
    id: "6",
    symbol: "MATIC",
    name: "Polygon",
    balance: 890.75,
    price: 0.892,
    change24h: -2.15,
    change7d: 5.67,
    change30d: 15.34,
    value: 794.63,
    logo: "MATIC",
    network: "polygon",
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "buy",
    asset: "BTC",
    amount: 0.1,
    price: 43200.0,
    timestamp: "2024-01-15T10:30:00Z",
    hash: "0x1234...5678",
    status: "completed",
  },
  {
    id: "2",
    type: "sell",
    asset: "ETH",
    amount: 0.5,
    price: 2640.0,
    timestamp: "2024-01-14T15:45:00Z",
    hash: "0x2345...6789",
    status: "completed",
  },
  {
    id: "3",
    type: "receive",
    asset: "USDT",
    amount: 500.0,
    price: 1.0,
    timestamp: "2024-01-13T08:20:00Z",
    hash: "0x3456...7890",
    status: "completed",
  },
  {
    id: "4",
    type: "send",
    asset: "BNB",
    amount: 2.0,
    price: 314.5,
    timestamp: "2024-01-12T12:15:00Z",
    hash: "0x4567...8901",
    status: "pending",
  },
];

export const mockNetworks: Network[] = [
  {
    id: "bsc",
    name: "Binance Smart Chain",
    symbol: "BNB",
    color: "#F3BA2F",
    rpc: "https://bsc-dataseed.binance.org",
    explorer: "https://bscscan.com",
    icon: "/crypto-logo/bnb-logo.svg",
    available: true,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    color: "#6d23e0",
    rpc: "https://mainnet.infura.io/v3/",
    explorer: "https://etherscan.io",
    icon: "/crypto-logo/ethereum-eth-logo-colored.svg",
    available: false,
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    color: "#ff2671",
    rpc: "dot-rpc.stakeworld.io",
    explorer: "https://polkadot.subscan.io",
    icon: "/crypto-logo/polkadot-new-dot-logo.svg",
    available: false,
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    color: "#6c5ebb",
    rpc: "https://api.mainnet-beta.solana.com",
    explorer: "https://solscan.io",
    icon: "/crypto-logo/solana-sol-logo.svg",
    available: false,
  },
];

export const mockPortfolioStats = {
  totalValue: 38444.53,
  totalChange24h: 1.23,
  totalChange7d: 2.45,
  totalChange30d: 9.87,
  totalGainLoss: 4234.67,
  totalGainLossPercentage: 12.34,
};

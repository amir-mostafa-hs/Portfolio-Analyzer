/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Asset {
  balance: string;
  balance_formatted: string;
  decimals: number;
  logo: string;
  name: string;
  native_token: boolean;
  percentage_relative_to_total_supply: any | null;
  portfolio_percentage: number;
  possible_spam: boolean;
  security_score: number;
  symbol: string;
  thumbnail: string;
  token_address: string;
  total_supply: any | null;
  total_supply_formatted: any | null;
  usd_price: number;
  usd_price_24hr_percent_change: number;
  usd_price_24hr_usd_change: number;
  usd_value: number;
  usd_value_24hr_usd_change: number;
  verified_contract: boolean;
}

export interface TransactionMock {
  id: string;
  type: "buy" | "sell" | "send" | "receive";
  asset: string;
  amount: number;
  price: number;
  timestamp: string;
  hash: string;
  status: "completed" | "pending" | "failed";
}

export type Transaction = {
  hash: string;
  nonce: string;
  transaction_index: string;
  from_address_entity: any | null;
  from_address_entity_logo: any | null;
  from_address: string;
  from_address_label: any | null;
  to_address_entity: any | null;
  to_address_entity_logo: any | null;
  to_address: string;
  to_address_label: any | null;
  value: string;
  gas: string;
  gas_price: string;
  receipt_cumulative_gas_used: string;
  receipt_gas_used: string;
  receipt_contract_address: any | null;
  receipt_status: string;
  block_timestamp: string;
  block_number: string;
  block_hash: string;
  transaction_fee: string;
  method_label: any | null;
  nft_transfers: any[];
  erc20_transfers: [
    {
      token_name: string;
      token_symbol: string;
      token_logo: string;
      token_decimals: string;
      from_address_entity: any | null;
      from_address_entity_logo: any | null;
      from_address: string;
      from_address_label: any | null;
      to_address_entity: any | null;
      to_address_entity_logo: any | null;
      to_address: string;
      to_address_label: any | null;
      address: string;
      log_index: number;
      value: string;
      possible_spam: boolean;
      verified_contract: boolean;
      security_score: number;
      direction: string;
      value_formatted: string;
    }
  ];
  native_transfers: [];
  summary: string;
  possible_spam: boolean;
  category: string;
  contract_interactions?: {
    approvals: [
      {
        value: string;
        value_formatted: string;
        token: {
          address: string;
          address_label: any | null;
          token_name: string;
          token_logo: string;
          token_symbol: string;
        };
        spender: {
          address: string;
          address_label: any | null;
        };
      }
    ];
  };
};

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
    token_address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    symbol: "BNB",
    name: "Binance Chain Native Token",
    logo: "https://cdn.moralis.io/bsc/0x.png",
    thumbnail: "https://cdn.moralis.io/bsc/0x_thumb.png",
    decimals: 18,
    balance: "81354349000000000",
    possible_spam: false,
    verified_contract: true,
    total_supply: null,
    total_supply_formatted: null,
    percentage_relative_to_total_supply: null,
    security_score: 99,
    balance_formatted: "0.081354349",
    usd_price: 687.4750100276764,
    usd_price_24hr_percent_change: -0.8780518155633413,
    usd_price_24hr_usd_change: -6.081386189439968,
    usd_value: 55.92908189457009,
    usd_value_24hr_usd_change: -0.4947472144594793,
    native_token: true,
    portfolio_percentage: 1.3217493744091926,
  },
  {
    token_address: "0xc4a1e7106d08b7ff947254b6d75cf2b877d55daf",
    symbol: "LQR",
    name: "Laqira Token",
    logo: "https://logo.moralis.io/0x38_0xc4a1e7106d08b7ff947254b6d75cf2b877d55daf_18d1bcc3f3b32d63f8ebffee05ad7cde.png",
    thumbnail:
      "https://logo.moralis.io/0x38_0xc4a1e7106d08b7ff947254b6d75cf2b877d55daf_18d1bcc3f3b32d63f8ebffee05ad7cde.png",
    decimals: 18,
    balance: "845572558408179688185",
    possible_spam: false,
    verified_contract: true,
    total_supply: "2500000000000000000000000000",
    total_supply_formatted: "2500000000",
    percentage_relative_to_total_supply: 0.000033822902336327,
    security_score: 47,
    balance_formatted: "845.572558408179688185",
    usd_price: 0.07446520708309118,
    usd_price_24hr_percent_change: -1.636454476233817,
    usd_price_24hr_usd_change: -0.0012388626376360068,
    usd_value: 62.96573566564431,
    usd_value_24hr_usd_change: -1.047548250022184,
    native_token: false,
    portfolio_percentage: 1.4880437673224152,
  },
];

export const mockTransactions: TransactionMock[] = [
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

import { createAppKit } from "@reown/appkit/react";

import { WagmiProvider } from "wagmi";
import { type AppKitNetwork, bsc, bscTestnet } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.reown.com
const projectId = "a95960ad908675660d0f873d1d781baa";

// 2. Create a metadata object - optional
const metadata = {
  name: "Portfolio-Analyzer",
  description: "Portfolio Analyzer",
  url: "https://portfolio-analyzer.vercel.app", // origin must match your domain & subdomain
  icons: ["https://portfolio-analyzer.vercel.app/favicon.ico"],
};

// 3. Set the networks
const networks = [bsc, bscTestnet] as [AppKitNetwork, ...AppKitNetwork[]];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

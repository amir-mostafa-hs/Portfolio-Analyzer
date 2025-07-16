import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Plus,
  RefreshCw,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import PortfolioStats from "./PortfolioStats";
import AssetCard from "./AssetCard";
import TransactionHistoryDemo from "./TransactionHistoryDemo";
import ChartComponent from "./ChartComponent";
import NetworkSelector from "./NetworkSelector";
import WalletStatus from "./WalletStatus";
import { mockAssets, Asset } from "@/data/mockData";

const walletBalances = [
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
    usd_price: 684.1789726809523,
    usd_price_24hr_percent_change: -0.7493522048051836,
    usd_price_24hr_usd_change: -5.179305539650045,
    usd_value: 55.66093492194766,
    usd_value_24hr_usd_change: -0.42135903045032314,
    native_token: true,
    portfolio_percentage: 1.315515161339417,
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
    usd_price: 0.07439128912436752,
    usd_price_24hr_percent_change: -1.687500090965326,
    usd_price_24hr_usd_change: -0.0012755525279089935,
    usd_value: 62.903232668174034,
    usd_value_24hr_usd_change: -1.0785722144080288,
    native_token: false,
    portfolio_percentage: 1.4866828303959128,
  },
];

const DemoDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const filteredAssets = mockAssets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const topPerformers = [...mockAssets]
    .sort(
      (a, b) =>
        b.usd_price_24hr_percent_change - a.usd_price_24hr_percent_change
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Portfolio Dashboard</h1>
            <p className="text-muted-foreground">
              Track and manage your cryptocurrency investments
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="glass" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="crypto" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Asset
            </Button>
          </div>
        </div>

        {/* Portfolio Stats */}
        <PortfolioStats walletBalances={walletBalances} />

        {/* Top Performers */}
        <Card className="bg-card/50 backdrop-blur-glass border-primary/10">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Top Performers (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {topPerformers.map((asset) => (
                <div
                  key={asset.token_address}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer"
                  onClick={() => handleAssetClick(asset)}
                >
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {asset.logo}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{asset.symbol}</div>
                    <div className="text-sm text-muted-foreground">
                      {asset.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-success">
                      +{asset.usd_price_24hr_percent_change.toFixed(2)}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${asset.usd_price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chart Section */}
        {/* <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ChartComponent asset={selectedAsset} />
          </div>
          <div>
            <WalletStatus />
          </div>
        </div> */}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Assets Section */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-glass border-primary/10">
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    My Assets
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search assets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="ghost" size="sm">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {filteredAssets.map((asset) => (
                    <AssetCard
                      key={asset.token_address}
                      asset={asset}
                      onClick={handleAssetClick}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <TransactionHistoryDemo />

            {/* Quick Actions */}
            <Card className="bg-card/50 backdrop-blur-glass border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="gradient" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Asset
                </Button>
                <Button
                  variant="gradient-secondary"
                  className="w-full justify-start"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync Wallets
                </Button>
                <Button
                  variant="gradient-accent"
                  className="w-full justify-start"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Set Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Network Selector */}
        <NetworkSelector />
      </div>
    </div>
  );
};

export default DemoDashboard;

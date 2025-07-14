import { useEffect, useState } from "react";
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
import TransactionHistory from "./TransactionHistory";
import ChartComponent from "./ChartComponent";
import NetworkSelector from "./NetworkSelector";
import WalletStatus from "./WalletStatus";
import { mockAssets, Asset } from "@/data/mockData";
import getWalletBalances, {
  useCryptoDataService,
} from "@/lib/getWalletBalances";
import { useAppKitAccount } from "@reown/appkit/react";
import { useNavigate } from "react-router-dom";
import { Coin, CryptoTickerSlider } from "./CryptoTickerSlider";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const { isConnected, address } = useAppKitAccount();
  const navigate = useNavigate();
  const [walletBalances, setWalletBalances] = useState([]);
  const [widgetData, setWidgetData] = useState<{
    gainers: Coin[];
    losers: Coin[];
  }>({ gainers: [], losers: [] });

  const { getTopMovers } = useCryptoDataService();

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    } else {
      // getWalletBalances("0x38", address).then((data) => {
      //   setWalletBalances(data);
      // });
      getTopMovers(10).then((data) => {
        setWidgetData(data);
      });
    }
  }, [isConnected]);

  if (!isConnected) return null;

  const filteredAssets = mockAssets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const topPerformers = [...mockAssets]
    .sort((a, b) => b.change24h - a.change24h)
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
        <CryptoTickerSlider data={widgetData} />

        {/* Chart Section */}
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ChartComponent asset={selectedAsset} />
          </div>
          <div>
            <WalletStatus />
          </div>
        </div>

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
                      key={asset.id}
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
            <TransactionHistory />

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

export default Dashboard;

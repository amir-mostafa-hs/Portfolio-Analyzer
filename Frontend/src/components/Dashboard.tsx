import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Plus,
  RefreshCw,
  // TrendingUp,
  BarChart3,
} from "lucide-react";
import PortfolioStats from "./PortfolioStats";
import AssetCard from "./AssetCard";
import TransactionHistory from "./TransactionHistory";
// import ChartComponent from "./ChartComponent";
import NetworkSelector from "./NetworkSelector";
// import WalletStatus from "./WalletStatus";
import { Asset } from "@/data/mockData";
import getWalletBalances, {
  useCryptoDataService,
  getWalletHistory,
} from "@/lib/getWalletBalances";
import { useAppKitAccount } from "@reown/appkit/react";
import { useNavigate } from "react-router-dom";
import { Coin, CryptoTickerSlider } from "./CryptoTickerSlider";
import PortfolioAnalysis, { AnalysisData } from "./PortfolioAnalysis";
import getAIAnalysis from "@/lib/getAIAnalysis";

const Dashboard = () => {
  const { isConnected, address } = useAppKitAccount();
  const { getTopMovers } = useCryptoDataService();

  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const navigate = useNavigate();
  const [walletBalances, setWalletBalances] = useState({
    data: [],
    unsafeData: [],
  });
  const [widgetData, setWidgetData] = useState<{
    gainers: Coin[];
    losers: Coin[];
  }>({ gainers: [], losers: [] });
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [AIAnalysis, setAIAnalysis] = useState<AnalysisData>(null);

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    } else {
      // get user wallet balances
      getWalletBalances("0x38", address).then((result) => {
        setWalletBalances(result);
      });
      // get top market gainers and losers
      getTopMovers(10).then((data) => {
        setWidgetData(data);
      });
      // get user wallet transaction history
      getWalletHistory("0x38", address, 10).then((data) => {
        setTransactionHistory(data);
      });
      // get AI analysis
      getAIAnalysis(walletBalances.data).then((data) => {
        setAIAnalysis(data);
      });
    }
  }, [isConnected]);

  if (!isConnected) return null;

  const filteredAssets = walletBalances.unsafeData
    .filter((asset) => {
      if (asset) {
        return (
          asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    })
    .sort((a, b) => {
      return b.usd_price - a.usd_price;
    });

  const handleAssetClick = (asset: Asset) => {
    // setSelectedAsset(asset);
  };

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
        <PortfolioStats walletBalances={walletBalances.data} />

        {/* Top Performers */}
        <CryptoTickerSlider data={widgetData} />

        {/* Chart Section */}
        {/* <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ChartComponent asset={selectedAsset} />
          </div>
          <div>
            <WalletStatus />
          </div>
        </div> */}

        {/* Ai Analysis */}
        {AIAnalysis && <PortfolioAnalysis analysisData={AIAnalysis} />}

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
                    {/* <Button variant="ghost" size="sm">
                      <Filter className="w-4 h-4" />
                    </Button> */}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {filteredAssets?.map((asset) => (
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
            <TransactionHistory transactions={transactionHistory} />

            {/* Quick Actions */}
            {/* <Card className="bg-card/50 backdrop-blur-glass border-primary/10">
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
            </Card> */}
          </div>
        </div>

        {/* Network Selector */}
        <NetworkSelector />
      </div>
    </div>
  );
};

export default Dashboard;

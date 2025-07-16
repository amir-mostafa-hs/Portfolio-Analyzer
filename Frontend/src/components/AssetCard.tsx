import { Asset } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssetCardProps {
  asset: Asset;
  onClick?: (asset: Asset) => void;
}

const AssetCard = ({ asset, onClick }: AssetCardProps) => {
  const isPositive = asset.usd_price_24hr_percent_change > 0;
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);
  };

  const formatBalance = (balance: string) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(parseFloat(balance));
  };

  return (
    <Card
      className={cn(
        "group transition-all duration-300 hover:shadow-glow hover:border-primary/30",
        "bg-card/50 backdrop-blur-glass border-primary/10 hover:bg-card/70"
      )}
      // onClick={() => onClick?.(asset)}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
              {asset.logo ? (
                <img src={asset.logo} alt={asset.name} />
              ) : (
                <img
                  src={`https://effigy.im/a/${asset.token_address}.svg`}
                  alt={asset.name}
                />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{asset.symbol}</h3>
              <p className="text-sm text-muted-foreground">{asset.name}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-danger" />
              )}
              <span
                className={cn(
                  "text-sm font-medium",
                  isPositive ? "text-success" : "text-danger"
                )}
              >
                {isPositive ? "+" : ""}
                {asset.usd_price_24hr_percent_change.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Balance</span>
            <span className="font-medium">
              {formatBalance(asset.balance_formatted)} {asset.symbol}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Price</span>
            <span className="font-medium">{formatPrice(asset.usd_price)}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-primary/10">
            <span className="text-sm text-muted-foreground">Value</span>
            <span className="font-bold text-lg">
              {formatPrice(asset.usd_value)}
            </span>
          </div>
        </div>

        {/* <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-muted-foreground mb-1">7d</div>
            <div
              className={cn(
                "font-medium",
                asset.change7d > 0 ? "text-success" : "text-danger"
              )}
            >
              {asset.change7d > 0 ? "+" : ""}
              {asset.change7d.toFixed(2)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground mb-1">30d</div>
            <div
              className={cn(
                "font-medium",
                asset.change30d > 0 ? "text-success" : "text-danger"
              )}
            >
              {asset.change30d > 0 ? "+" : ""}
              {asset.change30d.toFixed(2)}%
            </div>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default AssetCard;

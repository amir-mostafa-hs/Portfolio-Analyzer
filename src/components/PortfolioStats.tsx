import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Wallet, DollarSign, PieChart, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockPortfolioStats } from '@/data/mockData';

const PortfolioStats = () => {
  const stats = mockPortfolioStats;
  const isPositive = stats.totalChange24h > 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Portfolio Value */}
      <Card className="col-span-full lg:col-span-2 bg-gradient-primary border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-20"></div>
        <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
          <CardTitle className="text-lg font-medium text-primary-foreground">Total Portfolio Value</CardTitle>
          <Wallet className="h-5 w-5 text-primary-foreground/80" />
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-4xl font-bold text-primary-foreground mb-2 animate-fade-in">
            {formatCurrency(stats.totalValue)}
          </div>
          <div className="flex items-center space-x-2">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-success" />
            ) : (
              <TrendingDown className="w-4 h-4 text-danger" />
            )}
            <span className={cn(
              "text-sm font-medium",
              isPositive ? "text-success" : "text-danger"
            )}>
              {formatPercentage(stats.totalChange24h)} (24h)
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 24h Change */}
      <Card className="bg-card/50 backdrop-blur-glass border-primary/10 hover:shadow-glow transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">24h Change</CardTitle>
          <Activity className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {formatPercentage(stats.totalChange24h)}
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <TrendingUp className="w-3 h-3 text-success" />
            <span className="text-xs text-muted-foreground">vs yesterday</span>
          </div>
        </CardContent>
      </Card>

      {/* Total Gain/Loss */}
      <Card className="bg-card/50 backdrop-blur-glass border-primary/10 hover:shadow-glow transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Gain/Loss</CardTitle>
          <DollarSign className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">
            +{formatCurrency(stats.totalGainLoss)}
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <span className="text-xs text-muted-foreground">
              ({formatPercentage(stats.totalGainLossPercentage)})
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 7d Performance */}
      <Card className="bg-card/50 backdrop-blur-glass border-primary/10 hover:shadow-glow transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">7d Performance</CardTitle>
          <PieChart className="h-4 w-4 text-violet" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {formatPercentage(stats.totalChange7d)}
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <TrendingUp className="w-3 h-3 text-success" />
            <span className="text-xs text-muted-foreground">vs last week</span>
          </div>
        </CardContent>
      </Card>

      {/* 30d Performance */}
      <Card className="bg-card/50 backdrop-blur-glass border-primary/10 hover:shadow-glow transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">30d Performance</CardTitle>
          <Activity className="h-4 w-4 text-teal" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {formatPercentage(stats.totalChange30d)}
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <TrendingUp className="w-3 h-3 text-success" />
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioStats;
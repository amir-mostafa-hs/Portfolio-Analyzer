import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';

interface ChartProps {
  asset?: {
    symbol: string;
    name: string;
    price: number;
    change24h: number;
  };
}

const ChartComponent = ({ asset }: ChartProps) => {
  const [timeframe, setTimeframe] = useState('24h');
  const timeframes = ['24h', '7d', '30d', '90d', '1y'];

  // Mock chart data points
  const generateMockData = () => {
    const points = 50;
    const data = [];
    const basePrice = asset?.price || 45000;
    
    for (let i = 0; i < points; i++) {
      const variance = (Math.random() - 0.5) * 0.1;
      const price = basePrice * (1 + variance);
      data.push({
        x: i,
        y: price,
        time: new Date(Date.now() - (points - i) * 60000).toISOString()
      });
    }
    return data;
  };

  const mockData = generateMockData();
  const isPositive = (asset?.change24h || 0) > 0;

  // Simple SVG chart visualization
  const renderChart = () => {
    const width = 600;
    const height = 300;
    const padding = 40;
    
    const minPrice = Math.min(...mockData.map(d => d.y));
    const maxPrice = Math.max(...mockData.map(d => d.y));
    const priceRange = maxPrice - minPrice;
    
    const points = mockData.map((d, i) => {
      const x = padding + (i / (mockData.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((d.y - minPrice) / priceRange) * (height - 2 * padding);
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width="100%" height="300" viewBox={`0 0 ${width} ${height}`} className="text-primary">
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: isPositive ? '#10B981' : '#EF4444', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: isPositive ? '#10B981' : '#EF4444', stopOpacity: 0.05 }} />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        <g stroke="currentColor" strokeOpacity="0.1" strokeWidth="1">
          {[0, 1, 2, 3, 4].map(i => (
            <line 
              key={i}
              x1={padding} 
              y1={padding + (i * (height - 2 * padding) / 4)} 
              x2={width - padding} 
              y2={padding + (i * (height - 2 * padding) / 4)}
            />
          ))}
        </g>
        
        {/* Chart area */}
        <polygon
          points={`${padding},${height - padding} ${points} ${width - padding},${height - padding}`}
          fill="url(#chartGradient)"
          stroke="none"
        />
        
        {/* Chart line */}
        <polyline
          points={points}
          fill="none"
          stroke={isPositive ? '#10B981' : '#EF4444'}
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Data points */}
        {mockData.map((d, i) => {
          const x = padding + (i / (mockData.length - 1)) * (width - 2 * padding);
          const y = height - padding - ((d.y - minPrice) / priceRange) * (height - 2 * padding);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill={isPositive ? '#10B981' : '#EF4444'}
              opacity={i === mockData.length - 1 ? 1 : 0}
            />
          );
        })}
      </svg>
    );
  };

  return (
    <Card className="bg-card/50 backdrop-blur-glass border-primary/10">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">
              {asset ? `${asset.symbol} Price Chart` : 'Portfolio Performance'}
            </CardTitle>
            {asset && (
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-2xl font-bold">
                  ${asset.price.toLocaleString()}
                </span>
                <div className="flex items-center space-x-1">
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4 text-success" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-danger" />
                  )}
                  <span className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
                    {isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="flex space-x-1">
            {timeframes.map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeframe(tf)}
                className="text-xs"
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          {renderChart()}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
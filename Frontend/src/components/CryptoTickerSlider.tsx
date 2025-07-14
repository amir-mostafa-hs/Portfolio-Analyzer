import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

type Props = {
  data: {
    gainers: Coin[];
    losers: Coin[];
  };
};

const TickerSlider = ({
  coins,
  reverse = false,
  speed = 100, // smaller = faster
}: {
  coins: Coin[];
  reverse?: boolean;
  speed?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth / 2);
    }
  }, [coins]);

  return (
    <div className="relative overflow-hidden w-full border rounded-xl">
      <motion.div
        className={cn("flex whitespace-nowrap", reverse && "flex-row-reverse")}
        ref={containerRef}
        animate={{
          x: reverse ? [0, width] : [0, -width],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: speed,
        }}
      >
        {/* دو نسخه پشت سر هم برای ایجاد loop بی‌نهایت */}
        {[...coins, ...coins].map((coin, index) => (
          <div
            key={`${coin.id}-${index}`}
            className="flex items-center space-x-3 mx-2 my-2 px-4 py-2 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors min-w-[240px] max-w-[300px]"
          >
            <div className="rounded-full flex items-center justify-center text-white font-bold text-sm">
              <img src={coin.image} alt={coin.name} className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{coin.symbol}</div>
              <div className="text-sm text-muted-foreground">
                {coin.name.slice(0, 20)}
              </div>
            </div>
            <div className="text-right">
              <div
                className={cn(
                  "font-medium",
                  coin.price_change_percentage_24h > 0
                    ? "text-green-600"
                    : "text-red-600"
                )}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="text-sm text-muted-foreground">
                ${coin.current_price.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const CryptoTickerSlider = ({ data }: Props) => {
  return (
    <div className="space-y-4">
      <Card className="bg-card/50 backdrop-blur-glass border-primary/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Top Gainers (1h)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TickerSlider coins={data.gainers} reverse={false} speed={40} />
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-glass border-primary/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Top Losers (1h)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TickerSlider coins={data.losers} reverse={true} speed={40} />
        </CardContent>
      </Card>
    </div>
  );
};

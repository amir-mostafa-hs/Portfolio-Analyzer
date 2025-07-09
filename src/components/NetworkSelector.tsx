import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Network, CheckCircle, Circle } from 'lucide-react';
import { mockNetworks } from '@/data/mockData';
import { cn } from '@/lib/utils';

const NetworkSelector = () => {
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>(['ethereum', 'bitcoin']);

  const toggleNetwork = (networkId: string) => {
    setSelectedNetworks(prev =>
      prev.includes(networkId)
        ? prev.filter(id => id !== networkId)
        : [...prev, networkId]
    );
  };

  const isSelected = (networkId: string) => selectedNetworks.includes(networkId);

  return (
    <Card className="bg-card/50 backdrop-blur-glass border-primary/10">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <Network className="w-5 h-5 mr-2" />
          Network Selection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockNetworks.map((network) => (
            <div 
              key={network.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md",
                isSelected(network.id) 
                  ? "border-primary/30 bg-primary/5" 
                  : "border-muted/20 bg-muted/5 hover:border-primary/20"
              )}
              onClick={() => toggleNetwork(network.id)}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: network.color }}
                >
                  {network.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{network.name}</h3>
                  <p className="text-sm text-muted-foreground">{network.symbol}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={isSelected(network.id) ? "default" : "secondary"}
                  className="text-xs"
                >
                  {isSelected(network.id) ? "Active" : "Inactive"}
                </Badge>
                {isSelected(network.id) ? (
                  <CheckCircle className="w-5 h-5 text-success" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-primary/10">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {selectedNetworks.length} of {mockNetworks.length} networks selected
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedNetworks(mockNetworks.map(n => n.id))}
            >
              Select All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkSelector;
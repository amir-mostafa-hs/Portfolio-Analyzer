import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wallet, CheckCircle, AlertCircle, Wifi, WifiOff, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const WalletStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const { toast } = useToast();

  const walletAddress = "0x742d35Cc6634C0532925a3b8D404B2019000A8c9";
  const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Address copied!",
      description: "Wallet address has been copied to clipboard.",
    });
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected successfully.",
    });
  };

  const handleConnect = () => {
    setIsConnected(true);
    toast({
      title: "Wallet connected!",
      description: "Your wallet has been connected successfully.",
    });
  };

  return (
    <Card className="bg-card/50 backdrop-blur-glass border-primary/10">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <Wallet className="w-5 h-5 mr-2" />
          Wallet Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isConnected ? (
            <>
              <div className="flex items-center justify-between p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <div>
                    <div className="font-semibold text-success">Connected</div>
                    <div className="text-sm text-muted-foreground">MetaMask</div>
                  </div>
                </div>
                <Badge className="bg-success/20 text-success border-success/30">
                  Active
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Address</span>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm bg-muted/20 px-2 py-1 rounded font-mono">
                      {shortAddress}
                    </code>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleCopyAddress}
                      className="p-1 h-8 w-8"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Network</span>
                  <div className="flex items-center space-x-2">
                    <Wifi className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium">Ethereum Mainnet</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Balance</span>
                  <span className="text-sm font-medium">2.45 ETH</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex-1"
                  onClick={handleDisconnect}
                >
                  Disconnect
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="p-2"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between p-4 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-warning" />
                  <div>
                    <div className="font-semibold text-warning">Disconnected</div>
                    <div className="text-sm text-muted-foreground">No wallet connected</div>
                  </div>
                </div>
                <Badge className="bg-warning/20 text-warning border-warning/30">
                  Inactive
                </Badge>
              </div>

              <div className="text-center py-4">
                <WifiOff className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-4">
                  Connect your wallet to access your portfolio
                </p>
                <Button 
                  variant="connect" 
                  size="sm" 
                  onClick={handleConnect}
                  className="w-full"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletStatus;
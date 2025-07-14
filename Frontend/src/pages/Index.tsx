import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet, ArrowRight, Shield } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { open } = useAppKit();
  const { isConnected: appIsConnected } = useAppKitAccount();

  useEffect(() => {
    const startPortfolio = () => {
      if (appIsConnected) {
        setIsConnecting(true);
        // Simulate wallet connection process
        setTimeout(() => {
          setIsConnected(true);
          setIsConnecting(false);
          toast({
            title: "Wallet Connected Successfully!",
            description: "Welcome to your crypto portfolio dashboard.",
          });
          navigate("/portfolio");
        }, 2000);
      }
    };
    startPortfolio();
  }, [appIsConnected]);

  const handleConnectWallet = async () => {
    open();
  };

  const handleShowDemo = () => {
    setShowDemo(true);
    setTimeout(() => {
      setIsConnected(true);
      toast({
        title: "Demo Mode Activated",
        description:
          "You're now viewing a demo of the crypto portfolio analyzer.",
      });
      navigate("/demo");
    }, 1000);
  };

  if (isConnecting) {
    return (
      <div className="min-h-screen bg-background">
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
          <Card className="bg-card/50 backdrop-blur-glass border-primary/10 max-w-md w-full">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-crypto-pulse">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Connecting Wallet</h2>
              <p className="text-muted-foreground mb-6">
                Please approve the connection in your wallet...
              </p>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showDemo && !isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
          <Card className="bg-card/50 backdrop-blur-glass border-primary/10 max-w-md w-full">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6 animate-glow">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Initializing Demo</h2>
              <p className="text-muted-foreground mb-6">
                Setting up your demo portfolio...
              </p>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3 mx-auto" />
                <Skeleton className="h-4 w-1/3 mx-auto" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div>
        <HeroSection
          onConnectWallet={handleConnectWallet}
          onShowDemo={handleShowDemo}
        />

        {/* Call to Action Section */}
        <section className="bg-gradient-to-br from-background via-background/95 to-primary/5 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Ready to Start Managing Your Crypto?
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Connect your wallet to access real-time portfolio tracking,
                advanced analytics, and AI-powered insights.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-md mx-auto">
              <Button
                variant="connect"
                size="xl"
                onClick={handleConnectWallet}
                className="font-semibold group w-full sm:w-auto"
              >
                <Wallet className="w-5 h-5 mr-2" />
                Connect Wallet
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="glass"
                size="xl"
                onClick={handleShowDemo}
                className="font-semibold w-full sm:w-auto"
              >
                <Shield className="w-5 h-5 mr-2" />
                Try Demo
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;

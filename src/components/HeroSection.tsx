import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Wallet, TrendingUp, BarChart3, Zap, Lock, Globe } from 'lucide-react';

interface HeroSectionProps {
  onConnectWallet?: () => void;
  onShowDemo?: () => void;
}

const HeroSection = ({ onConnectWallet, onShowDemo }: HeroSectionProps) => {
  const features = [
    {
      icon: Shield,
      title: 'Multi-Chain Support',
      description: 'Track assets across Ethereum, BSC, Polygon, and more'
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Data',
      description: 'Live price updates and market analysis'
    },
    {
      icon: BarChart3,
      title: 'AI Insights',
      description: 'Smart analytics and portfolio optimization'
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Your data stays private and secure'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center animate-glow">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CryptoVault
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
            Your Complete
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Crypto Portfolio
            </span>
            <br />
            Command Center
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
            Track, analyze, and optimize your cryptocurrency investments across multiple chains 
            with real-time data, AI-powered insights, and institutional-grade security.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Button variant="connect" size="xl" className="font-semibold" onClick={onConnectWallet}>
              <Wallet className="w-5 h-5 mr-2" />
              Connect Wallet
            </Button>
            <Button variant="glass" size="xl" className="font-semibold" onClick={onShowDemo}>
              <Globe className="w-5 h-5 mr-2" />
              View Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card/20 backdrop-blur-glass border-primary/10 hover:shadow-glow transition-all duration-500 animate-scale-in"
              style={{animationDelay: `${0.6 + index * 0.1}s`}}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center animate-fade-in" style={{animationDelay: '1s'}}>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">500K+</div>
            <div className="text-muted-foreground">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-secondary mb-2">$2.8B</div>
            <div className="text-muted-foreground">Assets Tracked</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-accent mb-2">15+</div>
            <div className="text-muted-foreground">Networks</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-violet mb-2">99.9%</div>
            <div className="text-muted-foreground">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownLeft, Send, Download } from 'lucide-react';
import { mockTransactions, Transaction } from '@/data/mockData';
import { cn } from '@/lib/utils';

const TransactionHistory = () => {
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'buy':
        return <ArrowDownLeft className="w-4 h-4 text-success" />;
      case 'sell':
        return <ArrowUpRight className="w-4 h-4 text-danger" />;
      case 'send':
        return <Send className="w-4 h-4 text-warning" />;
      case 'receive':
        return <Download className="w-4 h-4 text-success" />;
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'buy':
        return 'text-success';
      case 'sell':
        return 'text-danger';
      case 'send':
        return 'text-warning';
      case 'receive':
        return 'text-success';
    }
  };

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success/20 text-success border-success/30">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-warning/20 text-warning border-warning/30">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-danger/20 text-danger border-danger/30">Failed</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount: number, asset: string) => {
    return `${amount.toFixed(6)} ${asset}`;
  };

  const formatValue = (amount: number, price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount * price);
  };

  return (
    <Card className="bg-card/50 backdrop-blur-glass border-primary/10">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTransactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-4 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium capitalize">{transaction.type}</span>
                    <span className="text-muted-foreground">{transaction.asset}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{formatDate(transaction.timestamp)}</span>
                    <span>•</span>
                    <span className="font-mono text-xs">{transaction.hash}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={cn(
                  "font-medium",
                  getTransactionColor(transaction.type)
                )}>
                  {formatAmount(transaction.amount, transaction.asset)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatValue(transaction.amount, transaction.price)}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {getStatusBadge(transaction.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
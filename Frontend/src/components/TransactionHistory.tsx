import React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  Download,
  Signature,
  Replace,
  ReceiptText,
} from "lucide-react";

type Props = {
  transactions: Transaction[];
};

const shortAddress = (addr: string) =>
  addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "-";

const formatDate = (date: string) => format(new Date(date), "MMM dd, hh:mm a"); // Jan 15, 02:00 PM

const TransactionHistory: React.FC<Props> = ({ transactions }) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "buy":
        return <ArrowDownLeft className="w-4 h-4 text-success" />;
      case "sell":
        return <ArrowUpRight className="w-4 h-4 text-danger" />;
      case "token send":
        return <Send className="w-4 h-4 text-warning" />;
      case "token receive":
      case "receive":
        return <Download className="w-4 h-4 text-success" />;
      case "approve":
        return <Signature className="w-4 h-4 text-blue-700" />;
      case "token swap":
        return <Replace className="w-4 h-4 text-pink-500" />;
      case "contract interaction":
        return <ReceiptText className="w-4 h-4 text-cyan-700" />;
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case "buy":
        return "text-success";
      case "sell":
        return "text-danger";
      case "token send":
        return "text-warning";
      case "token receive":
      case "receive":
        return "text-success";
      case "approve":
        return "text-blue-700";
      case "token swap":
        return "text-pink-500";
      case "contract interaction":
        return "text-cyan-700";
    }
  };

  const formatAmount = (amount: string, asset: string) => {
    return `${parseFloat(amount).toFixed(4)} ${asset}`;
  };

  const formatFee = (amount: string) => {
    return "fee: $" + parseFloat(amount).toFixed(6);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "1":
        return (
          <Badge className="bg-success/20 text-success border-success/30">
            Completed
          </Badge>
        );
      case "0":
        return (
          <Badge className="bg-warning/20 text-warning border-warning/30">
            Pending
          </Badge>
        );
      case "-1":
        return (
          <Badge className="bg-danger/20 text-danger border-danger/30">
            Failed
          </Badge>
        );
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-glass border-primary/10">
      <CardHeader>
        <CardTitle className="text-lg font-semibold ">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.hash}
              className="flex items-center justify-between p-4 rounded-lg duration-300 hover:shadow-glow hover:border-primary/30 transition-all bg-card/50 backdrop-blur-glass border-primary/10 hover:bg-card/70"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  {getTransactionIcon(transaction.category)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium capitalize">
                      {transaction.category}
                    </span>
                    <span className="text-muted-foreground">
                      {transaction.erc20_transfers &&
                        transaction.erc20_transfers[0]?.token_symbol}
                      {transaction.contract_interactions &&
                        transaction.contract_interactions.approvals[0].token
                          ?.token_symbol}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{formatDate(transaction.block_timestamp)}</span>
                    <span>•</span>
                    <span className="font-mono text-xs">
                      {shortAddress(transaction.hash)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={cn(
                    "font-medium text-sm",
                    getTransactionColor(transaction.category)
                  )}
                >
                  {transaction.erc20_transfers.length
                    ? formatAmount(
                        transaction.erc20_transfers[0]?.value_formatted,
                        transaction.erc20_transfers[0]?.token_symbol
                      )
                    : ""}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatFee(transaction.transaction_fee)}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {getStatusBadge(transaction.receipt_status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  Brain,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface AnalysisData {
  assets_symbols: string;
  analysis_summary: string;
  bullish_points: string[];
  bearish_points: string[];
  actionable_suggestion: string;
  confidence_score: string;
}

const PortfolioAnalysis: React.FC<{ analysisData: AnalysisData }> = ({
  analysisData,
}) => {
  const getConfidenceColor = (score: string): string => {
    const numScore = parseInt(score);
    if (numScore >= 4) return "bg-green-500";
    if (numScore >= 3) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getConfidencePercentage = (score: string): number => {
    return (parseInt(score) / 5) * 100;
  };

  const assets = analysisData.assets_symbols.split(", ");

  return (
    <Card className="min-h-screen bg-card/50 backdrop-blur-glass border-primary/10 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Brain className="h-8 w-8 text-purple-400" />
              AI Portfolio Analysis
            </h1>
            <p className="text-gray-400 mt-2">
              Advanced analysis of your cryptocurrency investments
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant="outline"
              className="bg-purple-500/20 text-purple-300 border-purple-500"
            >
              <Star className="h-4 w-4 mr-1" />
              AI Powered
            </Badge>
          </div>
        </div>

        {/* Assets Overview */}
        <Card
          className={cn(
            "group transition-all duration-300 hover:shadow-glow hover:border-primary/30",
            "bg-card/50 backdrop-blur-glass border-primary/10 hover:bg-card/70"
          )}
        >
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-400" />
              Analyzed Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {assets.map((asset, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-blue-500/20 text-blue-300 border-blue-500 px-3 py-1 text-sm"
                >
                  {asset.trim()}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analysis Summary */}
        <Card
          className={cn(
            "group transition-all duration-300 hover:shadow-glow hover:border-primary/30",
            "bg-card/50 backdrop-blur-glass border-primary/10 hover:bg-card/70"
          )}
        >
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-400" />
              Analysis Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 leading-relaxed">
              {analysisData.analysis_summary}
            </p>
          </CardContent>
        </Card>

        {/* Bullish & Bearish Points */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Bullish Points */}
          <Card
            className={cn(
              "group transition-all duration-300 hover:shadow-glow hover:border-primary/30",
              "bg-card/50 backdrop-blur-glass border-primary/10 hover:bg-card/70"
            )}
          >
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 text-green-400">
                <TrendingUp className="h-5 w-5" />
                Bullish Signals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisData.bullish_points.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bearish Points */}
          <Card
            className={cn(
              "group transition-all duration-300 hover:shadow-glow hover:border-primary/30",
              "bg-card/50 backdrop-blur-glass border-primary/10 hover:bg-card/70"
            )}
          >
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 text-red-400">
                <TrendingDown className="h-5 w-5" />
                Bearish Signals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisData.bearish_points.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actionable Suggestion */}
        <Card
          className={cn(
            "group transition-all duration-300 hover:shadow-glow hover:border-primary/30",
            "bg-card/50 backdrop-blur-glass border-primary/10 hover:bg-card/70"
          )}
        >
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2 text-yellow-400">
              <AlertTriangle className="h-5 w-5" />
              Recommended Action
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <p className="text-yellow-200 font-medium">
                {analysisData.actionable_suggestion}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Confidence Score */}
        <Card
          className={cn(
            "group transition-all duration-300 hover:shadow-glow hover:border-primary/30",
            "bg-card/50 backdrop-blur-glass border-primary/10 hover:bg-card/70"
          )}
        >
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Star className="h-5 w-5 text-purple-400" />
              AI Confidence Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Confidence Level</span>
                <span className="text-2xl font-bold">
                  {analysisData.confidence_score}/5
                </span>
              </div>
              <Progress
                value={getConfidencePercentage(analysisData.confidence_score)}
                className="h-3 bg-gray-700"
              />
              <p className="text-sm text-gray-400">
                This confidence score reflects the AI's certainty in the
                analysis based on available data and market conditions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm pt-4">
          <p>
            ⚠️ This analysis is for informational purposes only and should not
            be considered as financial advice.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PortfolioAnalysis;

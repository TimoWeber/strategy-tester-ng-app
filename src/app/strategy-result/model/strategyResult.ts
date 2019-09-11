export interface StrategyResult {
    trades: Trade[];
    tradeAnalysis: TradeAnalysis;
}

export interface Trade {
    tradeBuy: number;
    tradeSell: number;
    profit: number;
    budget: number;
    closeDate: string;
}

export interface TradeAnalysis {
    averageProfit: number;
    rewardRisk: number;
    totalProfit: number;
    profitableTrades: number;
    maxDrawdown: number;
    noOfBars: number;
    noOfTrades: number;
    totalTransactionCost: number;
}


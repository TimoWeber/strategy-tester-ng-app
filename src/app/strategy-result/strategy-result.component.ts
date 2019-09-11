import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StrategyResult, Trade, TradeAnalysis } from './model/strategyResult';
import { GraphData } from './model/graphData';
import { StrategySettings } from './model/strategySettings';

@Component({
  selector: 'app-strategy-result',
  templateUrl: './strategy-result.component.html',
  styleUrls: ['./strategy-result.component.css'],
})
export class StrategyResultComponent implements OnInit {
  trades: Trade[] = [];
  tradeAnalysis: TradeAnalysis = {
              averageProfit: 0,
              rewardRisk: 0,
              totalProfit: 0,
              profitableTrades: 0,
              maxDrawdown: 0,
              noOfBars: 0,
              noOfTrades: 0,
              totalTransactionCost: 0,
            };
  budget = 100000;
  risk = 0.02;
  finalProfit: number;
  graphData: GraphData[] = [];
  dateLabels: Date[] = [];
  data = [];

  constructor(private http: HttpClient) {
   }

  ngOnInit() {
    this.getResults();

    const graphDataEnty: GraphData = {
      label: 'Budget',
      data: this.data
    }
    this.graphData.push(graphDataEnty);
  }

  getResults(): void {
    const url = 'http://localhost:8080/api/strategy/trades/all';
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa('admin:admin')
      })
    };

    this.http.get(url, httpOptions).subscribe(
      (res: StrategyResult) => {
        for (const i of Object.keys(res.trades)) {
          const buyingPrice = res.trades[i].tradeBuy;
          const sellingPrice = res.trades[i].tradeSell;

          const trade: Trade = {
            tradeBuy: buyingPrice,
            tradeSell: sellingPrice,
            profit: Math.round((sellingPrice - buyingPrice) * 100) / 100,
            budget: Math.round(((this.budget * this.risk) / buyingPrice * sellingPrice + (this.budget * 0.98)) * 100) / 100,
            closeDate: res.trades[i].closeDate,
          };
          this.trades[i] = trade;
          this.finalProfit = Math.round((this.budget - trade.budget) * 100) / 100 * -1;
          this.data.push(trade.budget);
          this.dateLabels.push(new Date(trade.closeDate));
        }

        this.tradeAnalysis = {
              averageProfit: res.tradeAnalysis.averageProfit,
              rewardRisk:  Math.round(res.tradeAnalysis.rewardRisk * 100) / 100,
              totalProfit: res.tradeAnalysis.totalProfit,
              profitableTrades: res.tradeAnalysis.profitableTrades,
              maxDrawdown: res.tradeAnalysis.maxDrawdown,
              noOfBars: res.tradeAnalysis.noOfBars,
              noOfTrades: res.tradeAnalysis.noOfTrades,
              totalTransactionCost:  Math.round(res.tradeAnalysis.totalTransactionCost * 100) / 100,
            }

      },
      err => {
        alert('An error has ocurred while recieving results!');
      }
    );
  }

  showMessageFromChild(strategySettings: StrategySettings) {
    this.budget = strategySettings.budget;
    this.risk = strategySettings.risk;
    this.graphData = [];
    this.data = [];
    this.dateLabels = []

    this.getResults();

    const graphDataEnty: GraphData = {
      label: 'Budget',
      data: this.data
    }
    this.graphData.push(graphDataEnty);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Trade } from '../strategy-result/model/strategyResult';
import { GraphData } from '../strategy-result/model/graphData';

@Component({
  selector: 'app-budget-graph',
  templateUrl: './budget-graph.component.html',
  styleUrls: ['./budget-graph.component.css'],
})
export class BudgetGraphComponent implements OnInit {
  @Input() trades: Trade[];
  @Input() graphData: GraphData[];
  @Input() dateLabels: Date[];

  chartOptions = {
    elements: {
        line: {
            tension: 0
        }
    },
    responsive: true,
    scales: {
            xAxes: [{
                type: 'time',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Date',
                },
                time: {
                    parser: 'MM/DD/YYYY',
                    unit: 'day',
                    unitStepSize: 1,
                    displayFormats: {
                        day: 'MM/DD/YYYY'
                    }
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Total Budget (after Trade is closed)',
                }
            }]
        }
  };

  constructor() { }

  ngOnInit() {
  }
}

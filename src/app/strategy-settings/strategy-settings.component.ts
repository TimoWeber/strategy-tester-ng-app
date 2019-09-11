import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StrategySettings } from '../strategy-result/model/strategySettings';

@Component({
  selector: 'app-strategy-settings',
  templateUrl: './strategy-settings.component.html',
  styleUrls: ['./strategy-settings.component.css']
})
export class StrategySettingsComponent implements OnInit {
  @Input() budget: number;
  @Input() risk: number;
  @Output() budgetChange = new EventEmitter<StrategySettings>();
  model: StrategySettings = {
    budget: this.budget,
    risk: this.risk
  }

  constructor() { }

  ngOnInit() {
  }

  changeStrategy(): void {
       this.budgetChange.emit(this.model);
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { StrategyResultComponent } from './strategy-result/strategy-result.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { Router, Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { BudgetGraphComponent } from './budget-graph/budget-graph.component';
import { FormsModule } from '@angular/forms';
import { StrategySettingsComponent } from './strategy-settings/strategy-settings.component';

const appRoutes: Routes = [
  {
    path: 'strategy-result',
    component: StrategyResultComponent
  },
  {
    path: '',
    component: StrategyResultComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    StrategyResultComponent,
    NotFoundComponent,
    BudgetGraphComponent,
    StrategySettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { ChartConfiguration } from 'chart.js';
import * as Chart from 'chart.js';

export class DashboardBaseChart {

  protected options: ChartConfiguration;
  protected chartObj: Chart;
  protected canvas: any;
  protected context: any;
  private isInitialChart: boolean;

  constructor(chartId: string, options: ChartConfiguration) {
    this.canvas = document.getElementById(chartId);
    this.context = this.canvas.getContext('2d');
    this.chartObj = new Chart(this.context, options);
    this.options = options;
    this.setStatusInit();
  }

  get chart(): Chart {
    return this.chartObj;
  }

  get isChartUpdated() {
    return !this.isInitialChart;
  }

  setStatusInit() {
    this.isInitialChart = true;
  }

  setStatusUpdated() {
    this.isInitialChart = false;
  }

}

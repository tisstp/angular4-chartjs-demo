import { DashboardBaseChart } from './dashboard-base.chart';
import { legendCallbackForDataSets } from './dashboard.function';
import * as Chart from 'chart.js';
import { ChartConfiguration, ChartDataSets, PositionType } from 'chart.js';

export class DashboardBarChart extends DashboardBaseChart {

  constructor(chartId: string, legendBeginClass: string) {
    const options: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: [''],
        datasets: [
          { label: 'Label 1', data: [1.5] },
          { label: 'Label 2', data: [2] },
          { label: 'Label 3', data: [3] },
          { label: 'Label 4', data: [4] },
          { label: 'Label 5', data: [5] },
          { label: 'Label 6', data: [6] },
          { label: 'Label 7', data: [7] },
          { label: 'Label 8', data: [8] },
          { label: 'Label 9', data: [9] },
          { label: 'Label 10', data: [10] },
        ]
      },
      options: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 15,
            padding: 10,
          },
          onClick: null
        },
        tooltips: {
          enabled: false,
          mode: 'point',
          intersect: true
        },
        legendCallback(chart: Chart): string {
          return legendCallbackForDataSets(chart, legendBeginClass);
        }
      }
    };
    super(chartId, options);
  }

  legendPosition(position: PositionType) {
    this.chart.options.legend.position = position;
    this.chart.update();
  }

  legendDisplay(display: boolean) {
    this.chart.options.legend.display = display;
    this.chart.update();
  }

  setDataSets(datasets: ChartDataSets[]) {
    this.chart.data = {
      labels: [''],
      datasets: datasets
    };
    this.chart.update();
  }

  updateDataSets(datasets: ChartDataSets[]) {
    this.setUpdateChart();
    this.setDataSets(datasets);
    this.setStatusUpdated();
  }

  private setUpdateChart() {
    if (!this.isChartUpdated) {
      this.chart.options.tooltips.enabled = true;
      this.chart.update();
    }
  }

}

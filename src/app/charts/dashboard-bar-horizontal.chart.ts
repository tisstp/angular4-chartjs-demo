import { DashboardBaseChart } from './dashboard-base.chart';
import { customTooltipForStacked, legendCallbackForDataSets } from './dashboard.function';
import * as Chart from 'chart.js';
import { ChartConfiguration, ChartDataSets } from 'chart.js';

export class DashboardBarHorizontalChart extends DashboardBaseChart {

  constructor(chartId: string, legendBeginClass: string) {
    const options: ChartConfiguration = {
      type: 'horizontalBar',
      data: {
        labels: ['Label'],
        datasets: [
          {
            label: 'label 1',
            data: [727]
          }, {
            label: 'label 2',
            data: [238]
          }, {
            label: 'label 3',
            data: [1238]
          }
        ]
      },
      options: {
        legend: {
          position: 'bottom',
          display: false,
        },
        tooltips: {
          enabled: false,
          mode: 'point',
          intersect: true,
          position: 'average'
        },
        hover: {
          animationDuration: 0
        },
        scales: {
          xAxes: [{
            stacked: true,
            ticks: {
              display: false,
            },
            gridLines: {
              drawBorder: false,
              display: false,
            },
          }],
          yAxes: [{
            stacked: true,
            ticks: {
              display: false,
            },
            gridLines: {
              drawBorder: false,
              display: false,
            },
            // afterFit(scale?: any): void {
            //   scale.height = scale.height + 20;
            // }
          }]
        },
        legendCallback(chart: Chart): string {
          return legendCallbackForDataSets(chart, legendBeginClass);
        }
      }
    };

    super(chartId, options);
  }

  setDataSets(datasets: ChartDataSets[]) {
    this.chartObj.data = {
      labels: [''],
      datasets: datasets
    };
    this.chartObj.update();
  }

  updateDataSets(datasets: ChartDataSets[]) {
    this.setUpdateChart();
    this.setDataSets(datasets);
    this.setStatusUpdated();
  }

  updateDataSetsForStacked(datasets: ChartDataSets[], tooltipId) {
    this.setUpdateChartForStacked(tooltipId);
    this.setDataSets(datasets);
    this.setStatusUpdated();
  }

  private setUpdateChart() {
    if (!this.isChartUpdated) {
      this.chart.options.tooltips.enabled = true;
      this.chart.update();
    }
  }

  private setUpdateChartForStacked(tooltipId) {
    if (!this.isChartUpdated) {
      this.chart.options.tooltips.custom = function(tooltip) {
        customTooltipForStacked(this, tooltip, tooltipId);
      };
      this.chart.update();
    }
  }
}

import { doughnutColor } from './colors.constant';
import { DashboardBaseChart } from './dashboard-base.chart';
import { customTooltip, legendCallbackForLabels } from './dashboard.function';
import * as Chart from 'chart.js';
import { ChartConfiguration } from 'chart.js';

export class DashboardDoughnutChart extends DashboardBaseChart {

  constructor(chartId: string, legendBeginClass: string) {
    const options: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: [
          'Label 1',
          'Label 2',
          'Label 3',
          'Label 4',
          'Label 5',
          'Label 6',
          'Label 7',
          'Label 8',
          'Label 9',
          'Label 10',
        ],
        datasets: [{
          label: '# of Votes',
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          borderWidth: 1,
          borderAlign: 'center',
        }]
      },
      options: {
        title: {
          display: false,
        },
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            boxWidth: 15,
            padding: 10,
          }
        },
        tooltips: {
          enabled: false
        },
        legendCallback(chart: Chart): string {
          return legendCallbackForLabels(chart, legendBeginClass);
        }
      }
    };

    super(chartId, options);
  }

  setData(labels: string[], dataList: any[]) {
    this.chart.data = {
      labels: labels,
      datasets: [
        { label: '# of Votes', data: dataList }
      ]
    };
    this.chart.update();
  }

  updateDataSets(dataList: any[]) {
    this.setUpdateChart();
    this.chart.data.datasets = [
      {
        label: '# of Votes',
        data: dataList,
        backgroundColor: doughnutColor
      }
    ];
    this.chart.update();
  }

  private setUpdateChart() {
    if (!this.isChartUpdated) {
      this.chart.options.tooltips.custom = function(tooltip) {
        customTooltip(this, tooltip, 'doughnut_chart_tooltip', 'currency');
      };
      this.chart.update();
    }
  }

}

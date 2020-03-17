import { pieColor } from './colors.constant';
import { DashboardBaseChart } from './dashboard-base.chart';
import {
  customTooltip,
  drawPercent,
  legendCallbackForLabels
} from './dashboard.function';
import * as Chart from 'chart.js';
import { ChartConfiguration } from 'chart.js';

export class DashboardPieChart extends DashboardBaseChart {

  constructor(chartId: string, legendBeginClass: string) {
    const options: ChartConfiguration = {
      type: 'pie',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [{
          label: '# of Votes',
          data: [50, 29.2, 20.8],
          borderWidth: 2
        }]
      },
      options: {
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            boxWidth: 15,
          }
        },
        hover: {
          animationDuration: 0
        },
        tooltips: {
          enabled: false,
        },
        animation: {
          duration: 500,
          easing: 'easeOutQuart',
        },
        legendCallback(chart: Chart): string {
          return legendCallbackForLabels(chart, legendBeginClass);
        }
      }
    };

    super(chartId, options);
  }

  setData(labels: string[], dataList: any[], backgroundColor?: string[]) {
    this.chart.data = {
      labels: labels,
      datasets: [
        { backgroundColor, label: '# of Votes', data: dataList }
      ]
    };
    this.chart.update();
  }

  updateDataSets(labels: string[], dataList: any[]) {
    this.setUpdateChart();
    this.setData(labels, dataList, pieColor);
  }

  private setUpdateChart() {
    if (!this.isChartUpdated) {
      this.chart.options.animation.onComplete = drawPercent;
      this.chart.options.tooltips.custom = function(tooltip) {
        customTooltip(this, tooltip, 'pie_chart_tooltip', 'number');
      };
      this.chart.update();
    }
  }

}

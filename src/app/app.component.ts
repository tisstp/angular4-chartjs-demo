import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  canvas: any;
  ctx: any;

  myBarChart: any;

  ngOnInit(): void {
    this.chartPie();
    this.chartDoughnut();
    this.chartHorizontalBar();
    this.chartBar();
    this.chartHorizontalBarDemo();
  }

  updateChart() {
    this.myBarChart.options.legend.position = 'bottom';
    this.myBarChart.options.tooltips.enabled = true;
    this.myBarChart.update();
  }

  private chartPie() {
    const canvas: any = document.getElementById('chartPie');
    const ctxM: any = canvas.getContext('2d');

    function drawPercent(chart) {
      // console.log(this.data.datasets, chart);
      const ctx = this.chart.ctx;
      ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';

      this.data.datasets.forEach(function(dataset) {

        for (let i = 0; i < dataset.data.length; i++) {
          const model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
          const total = dataset._meta[Object.keys(dataset._meta)[0]].total;
          const mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius) / 2;
          const start_angle = model.startAngle;
          const end_angle = model.endAngle;
          const mid_angle = start_angle + (end_angle - start_angle) / 2;

          const x = mid_radius * Math.cos(mid_angle);
          const y = mid_radius * Math.sin(mid_angle);

          ctx.fillStyle = '#fff';
          if (i == 3) { // Darker text color for lighter background
            ctx.fillStyle = '#444';
          }
          const percent = String(Math.round(dataset.data[i] / total * 100)) + '%';
          // Don't Display If Legend is hide or value is 0
          if (dataset.data[i] != 0 && dataset._meta[chart.chart.id].data[i].hidden != true) {
            // ctx.fillText(dataset.data[i], model.x + x, model.y + y);
            // Display percent in another line, line break doesn't work for fillText
            ctx.fillText(percent, model.x + x, model.y + y + 5);
          }
        }
      });
    }

    function customTooltip(tooltip) {
      // Tooltip Element
      const tooltipEl: any = document.getElementById('chartjs-tooltip-pie');

      // Hide if no tooltip
      if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      // Set caret Position
      tooltipEl.classList.remove('above', 'below', 'no-transform');
      if (tooltip.yAlign) {
        tooltipEl.classList.add(tooltip.yAlign);
      } else {
        tooltipEl.classList.add('no-transform');
      }

      function getBody(bodyItem) {
        return bodyItem.lines;
      }

      // Set Text
      if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map(getBody);

        let innerHtml = '<thead>';

        titleLines.forEach(function(title) {
          innerHtml += '<tr><th>' + title + '</th></tr>';
        });
        innerHtml += '</thead><tbody>';

        bodyLines.forEach(function(body, i) {
          const colors = tooltip.labelColors[i];
          let style = 'background:' + colors.backgroundColor;
          style += '; border-color:' + colors.borderColor;
          style += '; border-width: 2px';
          const span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
          innerHtml += '<tr><td>' + span + body + '</td></tr>';
        });
        innerHtml += '</tbody>';

        const tableRoot = tooltipEl.querySelector('table');
        tableRoot.innerHTML = innerHtml;
      }

      const positionY = this._chart.canvas.offsetTop;
      const positionX = this._chart.canvas.offsetLeft;

      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1;
      tooltipEl.style.left = positionX + tooltip.caretX + 'px';
      tooltipEl.style.top = positionY + tooltip.caretY + 'px';
      tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
      tooltipEl.style.fontSize = tooltip.bodyFontSize;
      tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
      tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
    }

    const myPieChart = new Chart(ctxM, {
      type: 'pie',
      data: {
        labels: ['มีหลักประกัน', 'ไม่มีหลักประกัน(บสย.)', 'หนี้ประชารัฐ'],
        datasets: [{
          label: '# of Votes',
          data: [50, 29.2, 20.8],
          backgroundColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        tooltips: {
          enabled: false,
          custom: customTooltip
        },
        title: {
          display: true,
          text: 'จำนวนคดีที่มีหลักประกัน/ไม่มีหลักประกัน(บสย.)/หนี้ประชารัฐ'
        },
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 15,
            padding: 15,
            // usePointStyle: true,
          }
        },
        events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
        hover: {
          // animationDuration: 500
          animationDuration: 0
        },
        animation: {
          duration: 500,
          easing: 'easeOutQuart',
          // onProgress: drawPercent,
          onComplete: drawPercent
        }
      }
    });
  }

  private chartDoughnut() {
    const canvas: any = document.getElementById('chartDoughnut');
    const ctx: any = canvas.getContext('2d');
    const myDoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['New', 'In Progress', 'On Hold', 'Label 4', 'Label 5', 'Label 6', 'Label 7', 'Label 8', 'Label 9', 'Label 10'],
        datasets: [{
          label: '# of Votes',
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1,
          borderAlign: 'center',
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Custom Chart Title'
        },
        legend: {
          position: 'right',
          labels: {
            boxWidth: 15,
            padding: 10,
            // usePointStyle: true,
          }
        }
        // legendCallback: function(chart) {
        //   // Return the HTML string here.
        //   console.log(chart);
        // }
      }
    });
  }

  private chartHorizontalBar() {
    const barOptions_stacked = {
      tooltips: {
        enabled: true,
        // position: 'nearest',
        // intersect: true
      },
      hover: {
        animationDuration: 0
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
            fontFamily: '\'Open Sans Bold\', sans-serif',
            fontSize: 11
          },
          scaleLabel: {
            display: false
          },
          gridLines: {},
          stacked: true
        }],
        yAxes: [{
          gridLines: {
            display: false,
            color: '#fff',
            zeroLineColor: '#fff',
            zeroLineWidth: 0
          },
          ticks: {
            fontFamily: '\'Open Sans Bold\', sans-serif',
            fontSize: 11
          },
          stacked: true
        }]
      },
      legend: {
        display: true
      },
      animation: {
        onComplete: function() {
          const chartInstance = this.chart;
          const ctx = chartInstance.ctx;
          ctx.textAlign = 'left';
          ctx.font = '9px Open Sans';
          ctx.fillStyle = '#fff';

          Chart.helpers.each(this.data.datasets.forEach(function(dataset, i) {
            const meta = chartInstance.controller.getDatasetMeta(i);
            Chart.helpers.each(meta.data.forEach(function(bar, index) {
              const data = dataset.data[index];
              if (i == 0) {
                ctx.fillText(data, 50, bar._model.y + 4);
              } else {
                ctx.fillText(data, bar._model.x - 25, bar._model.y + 4);
              }
            }), this);
          }), this);
        }
      },
      pointLabelFontFamily: 'Quadon Extra Bold',
      scaleFontFamily: 'Quadon Extra Bold',
      gridLines: {
        drawBorder: false,
        drawTicks: false,
        drawOnChartArea: false,
        display: false,
      }
    };

    const canvas: any = document.getElementById('chartBarHorizontal');
    const ctx: any = canvas.getContext('2d');
    const myHorizontalBarChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        // labels: ['2014'],
        labels: ['2014', '2013', '2012', '2011'],

        datasets: [
          {
            label: 'label 1',
            data: [727],
            // data: [727, 1000],
            backgroundColor: 'rgba(63,103,126,1)',
            hoverBackgroundColor: 'rgba(50,90,100,1)'
          }, {
            label: 'label 2',
            data: [238],
            // data: [238, 1000],
            backgroundColor: 'rgba(163,103,126,1)',
            hoverBackgroundColor: 'rgba(140,85,100,1)'
          }, {
            label: 'label 3',
            data: [1238],
            // data: [1238, 1000],
            backgroundColor: 'rgba(63,203,226,1)',
            hoverBackgroundColor: 'rgba(46,185,235,1)'
          }
        ]
      },

      options: barOptions_stacked,
    });
  }

  private chartBar() {
    const canvas: any = document.getElementById('chartBar');
    const ctx: any = canvas.getContext('2d');
    /*const myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['New', 'In Progress', 'On Hold', 'Label 4', 'Label 5', 'Label 6', 'Label 7', 'Label 8', 'Label 9', 'Label 10'],
        datasets: [{
          label: '# of Votes',
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1,
          borderAlign: 'center',
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Custom Chart Title'
        },
        legend: {
          position: 'right',
          labels: {
            boxWidth: 15,
            padding: 10,
            // usePointStyle: true,
          }
        }
        // legendCallback: function(chart) {
        //   // Return the HTML string here.
        //   console.log(chart);
        // }
      }
    });*/
    this.myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [''],
        datasets: [
          { label: 'label 1', data: [1.5], backgroundColor: 'rgba(255, 99, 132, 1)' },
          { label: 'label 2', data: [2], backgroundColor: 'rgba(54, 162, 235, 1)' },
          { label: 'label 3', data: [3], backgroundColor: 'rgba(255, 206, 86, 1)' },
          { label: 'label 4', data: [4], },
          { label: 'label 5', data: [5], },
          { label: 'label 6', data: [6], },
          { label: 'label 7', data: [7], },
          { label: 'label 8', data: [8], },
          { label: 'label 9', data: [9], },
          { label: 'label 10', data: [10], },
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Custom Chart Title'
        },
        legend: {
          position: 'right',
          labels: {
            boxWidth: 15,
            padding: 10,
          }
        },
        tooltips: {
          enabled: false,
          mode: 'point',
          intersect: true
        },
      }
    });
  }

  private chartHorizontalBarDemo() {
    const barOptions_stacked: ChartOptions = {
      responsive: true,
      legend: {
        position: 'bottom',
        display: true,
        onClick(e, legendItem) {
          const index = legendItem.datasetIndex;
          const ci = this.chart;
          const meta = ci.getDatasetMeta(index);

          // See controller.isDatasetVisible comment
          meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;

          console.log(meta);

          // We hid a dataset ... rerender the chart
          ci.update();
        }
      },
      tooltips: {
        enabled: true,
        mode: 'point',
        intersect: true,
        // displayColors: false,
        // caretSize: 0,
        // titleFontSize: 0,
        // bodyFontSize: 9,
        // bodySpacing: 0,
        // titleSpacing: 0,
        // xPadding: 2,
        // yPadding: 2,
        // cornerRadius: 2,
        // titleMarginBottom: 2,
      },
      hover: {
        animationDuration: 0
      },
      scales: {
        /*xAxes: [{
          stacked: true,
          ticks: {
            display: false,
            beginAtZero: true,
            fontFamily: '\'Open Sans Bold\', sans-serif',
            fontSize: 11,
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
            fontFamily: '\'Open Sans Bold\', sans-serif',
            fontSize: 11
          },
          gridLines: {
            drawBorder: false,
            display: false,
            color: '#fff',
            zeroLineColor: '#fff',
            zeroLineWidth: 0
          },
          afterFit(scale?: any): void {
            scale.height = scale.height + 20;
          }
        }]*/
        xAxes: [{
          stacked: true,
          // ticks: {
          //   display: false,
          // },
          // gridLines: {
          //   drawBorder: false,
          //   display: false,
          // },
        }],
        yAxes: [{
          stacked: true,
          // ticks: {
          //   display: false,
          // },
          // gridLines: {
          //   drawBorder: false,
          //   display: false,
          // },
          // afterFit(scale?: any): void {
          //   scale.height = scale.height + 20;
          // }
        }]
      },
      animation: {
        /*onComplete: function() {
          const chartInstance = this.chart;
          const ctx = chartInstance.ctx;
          ctx.textAlign = 'left';
          ctx.font = '9px Open Sans';
          ctx.fillStyle = '#fff';

          Chart.helpers.each(this.data.datasets.forEach(function(dataset, i) {
            const meta = chartInstance.controller.getDatasetMeta(i);
            Chart.helpers.each(meta.data.forEach(function(bar, index) {
              const data = dataset.data[index];
              if (i == 0) {
                ctx.fillText(data, 50, bar._model.y + 2);
              } else {
                ctx.fillText(data, bar._model.x - 25, bar._model.y + 2);
              }
            }), this);
          }), this);
        }*/
      },
    };

    const canvas: any = document.getElementById('chartBarHorizontalDemo');
    const ctx: any = canvas.getContext('2d');
    const myHorizontalBarChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: ['2014'],
        datasets: [
          {
            label: 'label 1',
            data: [1],
            // data: [727, 1000],
            backgroundColor: 'rgba(63,103,126,1)',
            hoverBackgroundColor: 'rgba(50,90,100,1)'
          }, {
            label: 'label 2',
            data: [1],
            // data: [238, 1000],
            backgroundColor: 'rgba(163,103,126,1)',
            hoverBackgroundColor: 'rgba(140,85,100,1)'
          }, {
            label: 'label 3',
            data: [1],
            // data: [1238, 1000],
            backgroundColor: 'rgba(63,203,226,1)',
            hoverBackgroundColor: 'rgba(46,185,235,1)'
          }, {
            label: 'label 4',
            data: [1],
            // data: [1238, 1000],
            backgroundColor: 'rgba(63,103,126,1)',
            hoverBackgroundColor: 'rgba(50,90,100,1)'
          }, {
            label: 'label 5',
            data: [1],
            // data: [1238, 1000],
            backgroundColor: 'rgba(163,103,126,1)',
            hoverBackgroundColor: 'rgba(140,85,100,1)'
          }, {
            label: 'label 6',
            data: [1],
            // data: [1238, 1000],
            backgroundColor: 'rgba(63,203,226,1)',
            hoverBackgroundColor: 'rgba(46,185,235,1)'
          }, {
            label: 'label 7',
            data: [1],
            // data: [1238, 1000],
            backgroundColor: 'rgba(63,103,126,1)',
            hoverBackgroundColor: 'rgba(50,90,100,1)'
          }, {
            label: 'label 8',
            data: [1],
            // data: [1238, 1000],
            backgroundColor: 'rgba(163,103,126,1)',
            hoverBackgroundColor: 'rgba(140,85,100,1)'
          }, {
            label: 'label 9',
            data: [1],
            // data: [1238, 1000],
            backgroundColor: 'rgba(63,203,226,1)',
            hoverBackgroundColor: 'rgba(46,185,235,1)'
          }, {
            label: 'label 10',
            data: [1],
            // data: [727, 1000],
            backgroundColor: 'rgba(63,103,126,1)',
            hoverBackgroundColor: 'rgba(50,90,100,1)'
          }
        ]
      },

      options: barOptions_stacked,
    });
  }

}

import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.chartPie();
    this.chartDoughnut();
    this.chartHorizontalBar();
    this.chartBar();
  }

  private chartPie() {
    const canvas: any = document.getElementById('chartPie');
    const ctxM: any = canvas.getContext('2d');

    function drawPercent() {
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
          if (dataset.data[i] != 0 && dataset._meta[0].data[i].hidden != true) {
            ctx.fillText(dataset.data[i], model.x + x, model.y + y);
            // Display percent in another line, line break doesn't work for fillText
            ctx.fillText(percent, model.x + x, model.y + y + 15);
          }
        }
      });
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
        animation: {
          duration: 500,
          easing: 'easeOutQuart',
          onProgress: drawPercent,
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
        enabled: false
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
        display: false
      },

      animation: {
        onComplete: function() {
          let chartInstance = this.chart;
          let ctx = chartInstance.ctx;
          ctx.textAlign = 'left';
          ctx.font = '9px Open Sans';
          ctx.fillStyle = '#fff';

          Chart.helpers.each(this.data.datasets.forEach(function(dataset, i) {
            let meta = chartInstance.controller.getDatasetMeta(i);
            Chart.helpers.each(meta.data.forEach(function(bar, index) {
              let data = dataset.data[index];
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
    };

    const canvas: any = document.getElementById('chartBarHorizontal');
    const ctx: any = canvas.getContext('2d');
    const myHorizontalBarChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: ['2014', '2013', '2012', '2011'],

        datasets: [{
          data: [727, 589, 537, 543, 574],
          backgroundColor: 'rgba(63,103,126,1)',
          hoverBackgroundColor: 'rgba(50,90,100,1)'
        }, {
          data: [238, 553, 746, 884, 903],
          backgroundColor: 'rgba(163,103,126,1)',
          hoverBackgroundColor: 'rgba(140,85,100,1)'
        }, {
          data: [1238, 553, 746, 884, 903],
          backgroundColor: 'rgba(63,203,226,1)',
          hoverBackgroundColor: 'rgba(46,185,235,1)'
        }]
      },

      options: barOptions_stacked,
    });
  }

  private chartBar() {
    const canvas: any = document.getElementById('chartBar');
    const ctx: any = canvas.getContext('2d');
    const myBarChart = new Chart(ctx, {
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
    });
  }
}

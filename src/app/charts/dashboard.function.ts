import * as Chart from 'chart.js';

export function legendCallbackForDataSets(chart, beginClass: string) {
  return legendCallback(chart, 'datasets', beginClass);
}

export function legendCallbackForLabels(chart, beginClass: string) {
  return legendCallback(chart, 'labels', beginClass);
}

/**
 * Generate Html Legend
 * @param chart
 * @param chooseBy from labels or datasets
 * @param beginClass bg-color => bg-color-{0}
 */
export function legendCallback(chart, chooseBy: 'labels' | 'datasets', beginClass: string) {
  const text = [];
  text.push('<div class="d-flex flex-wrap chart-cap">');
  for (let i = 0; i < chart.data[chooseBy].length; i++) {
    const bgClass = (chooseBy === 'labels' && chart.data.datasets[0].backgroundColor)
                 || (chooseBy === 'datasets' && chart.data.datasets[i].backgroundColor) ? `${beginClass}-${i}` : '';
    const label = chooseBy === 'labels' ? chart.data.labels[i] : chart.data.datasets[i].label;
    text.push('<div class="">');
    text.push('<span class="dbd-legend-box ' + bgClass + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>');
    text.push('<span>' + label + '</span>');
    text.push('</div>');
  }
  text.push('</div>');
  return text.join('');
}

export function customTooltip(_this, tooltip, tooltipId, unit: 'number' | 'currency') {
  // Tooltip Element
  const tooltipEl: any = document.getElementById(tooltipId);

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
    const { datasetIndex, index } = tooltip.dataPoints[0];
    const value  = _this._chart.data.datasets[datasetIndex].data[index];

    const titleLines = [_this._chart.data.labels[index]];
    const bodyLines = tooltip.body.map(getBody);

    let innerHtml = '<thead>';
    titleLines.forEach(function(title) {
      innerHtml += '<tr><th>' + title + '</th></tr>';
    });
    innerHtml += '</thead><tbody>';

    bodyLines.forEach(function(body, i) {
      let val = '0';
      if (unit === 'currency') {
        const options = {
          style: 'currency',
          currency: 'THB'
        };
        val = Number(value).toLocaleString('th-TH', options);
        val = val.substr(1);
      } else if (unit === 'number') {
        val = value;
      } else {
        val = body;
      }

      const colors = tooltip.labelColors[i];
      let style = 'background:' + colors.backgroundColor;
      style += '; border-color:' + colors.borderColor;
      style += '; border-width: 2px';
      style += '; margin-right: 5px';
      const span = '<span class="chartjs-tooltip-key" style="' + style + '">&nbsp;&nbsp;&nbsp;&nbsp;</span>';
      innerHtml += '<tr><td>' + span + val + '</td></tr>';
    });
    innerHtml += '</tbody>';

    const tableRoot = tooltipEl.querySelector('table');
    tableRoot.innerHTML = innerHtml;
  }

  const positionY = _this._chart.canvas.offsetTop;
  const positionX = _this._chart.canvas.offsetLeft;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
  tooltipEl.style.fontSize = tooltip.bodyFontSize;
  tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
  tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
}

export function customTooltipForStacked(_this, tooltip, tooltipId) {
  // Tooltip Element
  const tooltipEl: any = document.getElementById(tooltipId);

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
    const { datasetIndex, index, value } = tooltip.dataPoints[0];
    const { label } = _this._chart.data.datasets[datasetIndex];
    const percent = Number(value).toFixed(2);
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map(getBody);

    let innerHtml = '<thead>';
    titleLines.forEach(function(title) {
      innerHtml += '<tr><th>' + label + '</th></tr>';
    });
    innerHtml += '</thead><tbody>';

    bodyLines.forEach(function(body, i) {
      const colors = tooltip.labelColors[i];
      let style = 'background:' + colors.backgroundColor;
      style += '; border-color:' + colors.borderColor;
      style += '; border-width: 2px';
      style += '; margin-right: 5px';
      const span = '<span class="chartjs-tooltip-key" style="' + style + '">&nbsp;&nbsp;&nbsp;&nbsp;</span>';
      innerHtml += '<tr><td>' + span + percent + ' %</td></tr>';
    });
    innerHtml += '</tbody>';

    const tableRoot = tooltipEl.querySelector('table');
    tableRoot.innerHTML = innerHtml;
  }

  const positionY = _this._chart.canvas.offsetTop;
  const positionX = _this._chart.canvas.offsetLeft;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
  tooltipEl.style.fontSize = tooltip.bodyFontSize;
  tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
  tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
}

export function drawPercent(chart) {
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

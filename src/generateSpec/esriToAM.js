import { buildQuery } from '../query/query'
import vg from 'vega'
import _ from 'lodash'

const dl = vg.util


export function esriToAM(esriChartSpec) {
  const query = buildQuery(esriChartSpec.dataSource, esriChartSpec.series[0].query)
  const data = dl.json(query).features
    .map((attr) => { return attr.attributes })

  const mappings = buildMappings(esriChartSpec.series[0], esriChartSpec.axes, esriChartSpec.legend[0])

  return {
    "type": "serial",
    "theme": "none",
    dataProvider: data,
    "valueAxes": [
      {
        "gridColor": "#FFFFFF",
        "gridAlpha": 0.2,
        "dashLength": 0
      }
    ],
    "gridAboveGraphs": true,
    "startDuration": 1,
    "graphs": [{
      "balloonText": "[[category]]: <b>[[value]]</b>",
      "fillAlphas": 0.8,
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": mappings.y.field
    }],
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
    "categoryField": mappings.x.field,
    "categoryAxis": {
      "gridPosition": "start",
      "labelRotation": 45,
      "gridAlpha": 0,
      "tickPosition": "start",
      "tickLength": 20
    },
    "export": {
      "enabled": true
    }
  }
}

function buildMappings(series, axes, legend) {
  const mapping = {
    x: { field: series.x, label: filterAxes(series.horizontalAxisId, axes).title },
    y: { field: series.y, label: filterAxes(series.verticalAxisId, axes).title }
  }
  if (!!series.visualVariables) {
    const colorInfo = filterVisualVariables('colorInfo', series.visualVariables)
    if (!!colorInfo) {
      mapping.color = { field: colorInfo.field, label: legend.title }
    }
  }
  return mapping
}

function filterAxes(axisID, axes) {
  const filteredAxes = _.find(axes, {'id': axisID})
  return filteredAxes
}

function filterVisualVariables(type, visualVariables) {
  return _.find(visualVariables, {'type': type})
}

import { supplant, getTokenValue, applyDefaultsToMappings } from '../helpers/utils'
import { buildQuery } from '../query/query'
import specTemplates from '../specs/spec'
import vg from 'vega'
import _ from 'lodash'

const dl = vg.util

export function esriToVega(esriChartSpec) {
  const query = buildQuery(esriChartSpec.dataSource, esriChartSpec.series[0].query)
  const vegaChartSpec = whichSpec(esriChartSpec.series[0])

  const data = dl.json(query)

  const mappings = applyDefaultsToMappings(buildMappings(esriChartSpec.series[0], esriChartSpec.axes, esriChartSpec.legend[0]), vegaChartSpec.inputs)

  const spec = JSON.parse(supplant(JSON.stringify(vegaChartSpec.template), mappings))
  if (spec.data[0].url) { delete spec.data[0].url }

  spec.data[0].values = data

  return spec
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

function whichSpec(series) {
  const options = [{'barSeries': 'bar'}, {'lineSeries': 'line'}, {'scatterSeries': 'scatter'}, {'histogramSeries': 'histogram'}]
  const type = options.filter((type) => { return type.hasOwnProperty(series.type) })[0]
  return specTemplates[type[series.type]]
}

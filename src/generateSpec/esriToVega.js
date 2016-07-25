import { supplant, getTokenValue, applyDefaultsToMappings } from '../helpers/utils'
import { buildQuery } from '../query/query'
import specTemplates from '../specs/spec'
import vg from 'vega'
import _ from 'lodash'

const dl = vg.util

export function parseEsriSpec(esriChartSpec) {
  const query = buildQuery(esriChartSpec.dataSource, esriChartSpec.series[0].query)
  const vegaChartSpec = whichSpec(esriChartSpec.series[0])
  console.log(vegaChartSpec)

  const data = dl.json(query)

  const mappings = applyDefaultsToMappings(buildMappings(esriChartSpec.series[0], esriChartSpec.axes), vegaChartSpec.inputs)

  const spec = JSON.parse(supplant(JSON.stringify(vegaChartSpec.template), mappings))
  if (spec.data[0].url) { delete spec.data[0].url }

  spec.data[0].values = data

  return spec
}

function buildMappings(series, axes) {
  const mapping = {
    x: {field: series.x, label: filterAxes(series.horizontalAxisId, axes).title},
    y: {field: series.y, label: filterAxes(series.verticalAxisId, axes).title}
  }

  return mapping
}

function filterAxes(axisID, axes) {
  const filteredAxes = _.find(axes, {'id': axisID})
  return filteredAxes
}

function whichSpec(series) {
  const options = [{'barSeries': 'bar'}, {'lineSeries': 'line'}, {'scatterSeries': 'scatter'}, {'histogramSeries': 'histogram'}]
  const type = options.filter((type) => { return type.hasOwnProperty(series.type) })[0]
  console.log(type)
  return specTemplates[type[series.type]]
}

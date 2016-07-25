import { supplant, getTokenValue } from '../helpers/utils'
import { buildQuery } from '../query/query'
import vg from 'vega'
import _ from 'lodash'

const dl = vg.util

export function parseEsriSpec(esriChartSpec, vegaChartSpec) {
  const query = buildQuery(esriChartSpec.dataSource, esriChartSpec.series[0].query)

  const data = dl.json(query)
  const mappings = buildMappings(esriChartSpec.series[0], esriChartSpec.axes)

  const spec = JSON.parse(supplant(JSON.stringify(vegaChartSpec.template), mappings))
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

import { supplant, getTokenValue, applyDefaultsToMappings } from '../helpers/utils'
import { buildMappings, determineSpec } from '../helpers/specHelpers'
import { buildQuery } from '../query/query'
import specTemplates from '../specs/spec'
import vg from 'vega'

const dl = vg.util

export function esriToVega(esriChartSpec, data) {
  const vegaChartSpec = determineSpec(esriChartSpec.series[0], specTemplates)


  const mappings = applyDefaultsToMappings(buildMappings(esriChartSpec.series[0], esriChartSpec.axes, esriChartSpec.legend[0]), vegaChartSpec.inputs)

  const spec = JSON.parse(supplant(JSON.stringify(vegaChartSpec.template), mappings))
  if (spec.data[0].url) { delete spec.data[0].url }

  spec.data[0].values = data.features.map((attr) => {return attr.attributes})
  spec.stats = dl.summary(data.features.map((attr) => { return attr.attributes }))

  return spec
}

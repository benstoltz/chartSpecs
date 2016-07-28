import { supplant, getTokenValue, applyDefaultsToMappings } from '../helpers/utils'
import { buildMappings, determineSpec } from '../helpers/specHelpers'
import { buildQuery } from '../query/query'
import specTemplates from '../specs/spec'
import vg from 'vega'

const dl = vg.util
const maxLength = 20

export function esriToVega(esriChartSpec, data) {
  const vegaChartSpec = determineSpec(esriChartSpec.series[0], specTemplates)


  const mappings = applyDefaultsToMappings(buildMappings(esriChartSpec.series[0], esriChartSpec.axes, esriChartSpec.legend[0]), vegaChartSpec.inputs)

  const spec = JSON.parse(supplant(JSON.stringify(vegaChartSpec.template), mappings))
  if (spec.data[0].url) { delete spec.data[0].url }

  console.log(cropLabels(data, maxLength))
  spec.data[0].values = cropLabels(data, maxLength).features.map((attr) => {return attr.attributes})
  spec.stats = dl.summary(data.features.map((attr) => { return attr.attributes }))

  return spec
}

function cropLabels(data, maxLength) {
  const dataCopy = data
  dataCopy.features = dataCopy.features.map((attr) => {
    for (let key in attr.attributes) {
      if (typeof attr.attributes[key] === 'string') {
        let label = attr.attributes[key]
        attr.attributes[key] = (label.length > maxLength) ? dl.truncate(label, maxLength) : label
      }
    }
    return attr
  })
  return dataCopy
}

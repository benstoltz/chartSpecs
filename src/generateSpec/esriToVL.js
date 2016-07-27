import { buildMappings, whichSpec } from '../helpers/specHelpers'
import { buildQuery } from '../query/query'
import specTemplates from '../specs/spec'
import vg from 'vega'

const dl = vg.util

export function esriToVL(esriChartSpec) {
  const query = buildQuery(esriChartSpec.dataSource, esriChartSpec.series[0].query)
  const data = dl.json(query).features
    .map((attr) => { return attr.attributes })

  const specType = whichSpec(esriChartSpec.series[0], specTemplates)
  const mappings = buildMappings(esriChartSpec.series[0], esriChartSpec.axes, esriChartSpec.legend[0])
  mappings.stats = dl.summary(data)

  return {
    "description": "default description",
    "data": data,
    "mark": specType[esriChartSpec.series[0].type],
    "encodings": {

    }
  }
}


function determineDataType() {
  return true
}

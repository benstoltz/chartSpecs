import { buildMappings, whichSpec } from '../helpers/specHelpers'
import { buildQuery } from '../query/query'
import specTemplates from '../specs/spec'
import vg from 'vega'
import _ from 'lodash'

const dl = vg.util

export function esriToVL(esriChartSpec, data) {
  // const query = buildQuery(esriChartSpec.dataSource, esriChartSpec.series[0].query)
  const dataArr = data.features
    .map((attr) => { return attr.attributes })

  const specType = whichSpec(esriChartSpec.series[0], specTemplates)
  const mappings = buildMappings(esriChartSpec.series[0], esriChartSpec.axes, esriChartSpec.legend[0])
  mappings.stats = dl.summary(dataArr)

  return {
    "data": {
      values: dataArr
    },
    "mark": specType[esriChartSpec.series[0].type],
    "encoding": determineDataType(mappings)
  }
}


function determineDataType(mappings) {
  const tempMappings = mappings
  for (let key in mappings) {
    const stat = attachDataType(mappings, key)
    if (stat !== undefined) {
      tempMappings[key].type = typeToEncoding(stat.type)
      delete tempMappings[key].label
    }
  }
  if (!!tempMappings.color) { delete tempMappings.color }
  delete tempMappings.stats
  return tempMappings
}

function attachDataType(mappings, prop) {
  return _.find(mappings.stats, (stat) => {
    return stat.field === mappings[prop].field
  })
}

function typeToEncoding(type) {
  if (type === "string") {
    return "nominal"
  } else if (type === "number") {
    return "quantitative"
  }
}

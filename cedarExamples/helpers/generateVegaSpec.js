const barChart = require('../bar/esriBar')
const vegaBarTemplate = require('../bar/cedarBar.json')
const dl = require('vega').util
const _ = require('lodash')


function parseEsriSpec(esriChartSpec, vegaChartSpec) {
  const query = buildQuery(esriChartSpec.dataSource, esriChartSpec.series[0].query)

  const data = dl.json(query)
  const axes = convertAxes()
  const mappings = buildMappings(esriChartSpec.series[0], esriChartSpec.axes)

  const spec = JSON.parse(supplant(JSON.stringify(vegaChartSpec.template), mappings))
  spec.data[0].values = data

  return spec
}




function convertAxes() {
  return;
}

function convertLegend() {
  return;
}

module.exports = {parseEsriSpec}
// parseVegaTemplate(vegaBarTemplate)

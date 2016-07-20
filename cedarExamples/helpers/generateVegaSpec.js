const barChart = require('../bar/esriBar')
const vegaBarTemplate = require('../bar/cedarBar.json')

function parseEsriSpec(esriChartSpec) {
  const query = buildQuery(esriChartSpec.dataSource, esriChartSpec.series[0].query)
  // console.log(esriChartSpec)
}

function parseVegaTemplate(vegaTemplateSpec) {
  console.log(vegaTemplateSpec)
}

function buildQuery(url, query) {
 console.log('dataSource', url)
 console.log('query', query)
}

function convertAxes() {
 return;
}

function convertLegend() {
 return;
}

parseEsriSpec(barChart)
// parseVegaTemplate(vegaBarTemplate)

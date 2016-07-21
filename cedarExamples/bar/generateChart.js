const {parseEsriSpec} = require('../helpers/generateVegaSpec')
const barChart = require('./esriBar')
const vegaBarTemplate = require('./cedarBar.json')
const completeOutput = require('./cedarOutputSpec.json')
const vg = require('vega')


const esriBar = parseEsriSpec(barChart, vegaBarTemplate)

vg.parse.spec(esriBar, (chart) => {
  const view = chart({ renderer: "canvas" }).update()
  const canvas = view.canvas()
  console.log(`<img src="${canvas.toDataURL()}" />`)
})

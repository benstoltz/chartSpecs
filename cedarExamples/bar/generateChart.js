const {parseEsriSpec} = require('../helpers/generateVegaSpec')
const barChart = require('./esriBar')
const vegaBarTemplate = require('./cedarBar.json')
const completeOutput = require('./cedarOutputSpec.json')
const vg = require('vega')


const esriBar = parseEsriSpec(barChart, vegaBarTemplate)

vg.parse.spec(esriBar, (error, chart) => { chart({el:'#vis'}).update() })

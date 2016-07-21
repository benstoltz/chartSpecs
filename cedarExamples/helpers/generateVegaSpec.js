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

function parseVegaTemplate(vegaTemplateSpec) {
  return {

  }
}

/**
 * Build query from url & query object & query defaults
 *
 * @param {string} url - base url
 * @param {object} query - query from json spec input
 * @param {object} queryDefaults - optional
 *
 * @returns {string} - constructed query call
 */
function buildQuery(url, query, queryDefaults = defaultQuery()) {
  const mergedQuery = mixin({}, queryDefaults, query)

  if (mergedQuery.bbox) {
    // Make sure a geom was not also passed in
    if(mergedQuery.geometry) {
      throw new Error('Dataset.query can not have both a geom and a bbox specified')
    }
    // get the bbox (W,S,E,N)
    const bboxArr = mergedQuery.bbox.split(',')

    // remove it so it's not serialized as is
    delete mergedQuery.bbox

    // json.stringofy it
    mergedQuery.geometry = JSON.stringify({ "xmin": bboxArr[0], "ymin": bboxArr[2],"xmax": bboxArr[1], "ymax": bboxArr[3] })
    // set spat ref as geog
    mergedQuery.inSR = '4326'
  }

  return `${url}/query?${serializeQueryParams(mergedQuery)}`
}

/**
 * Takes in params, iterates over them, encodes and returns stringified and encoded query
 *
 * @param {object} params - merged default and user defined parameters
 *
 * @returns {string} - stringified and encoded query
 */
function serializeQueryParams(params) {
  const str = []
  for (const param in params) {
    if(params.hasOwnProperty(param)) {
      let val = params[param]
      if (typeof val !== "string") {
        val = JSON.stringify(val)
      }
      str.push(`${encodeURIComponent(param)}=${encodeURIComponent(val)}`)
    }
  }
  const queryString = str.join("&")
  return queryString
}

/**
 * Returns default query
 *
 * @returns {object} - returns default query parameters
 */
function defaultQuery() {
  return {
    where: '1=1',
    returnGeometry: false,
    returnDistinctValues: false,
    returnIdsOnly: false,
    returnCountOnly: false,
    outFields: '*',
    f: 'json'
  }
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

function convertAxes() {
  return;
}

function convertLegend() {
  return;
}

/**
 * merges n objects
 *
 * @param {object} - empty object that input objects will be merged into
 *
 * @returns {object} - merged object
 */
function mixin(source) {
  const args = [...arguments]
  for (let i = 1; i < args.length; i++) {
    for ( const key of Object.keys(args[i])) {
      source[key] = args[i][key]
    }
  }
  return source
}

function supplant(template, params) {
  const t = template.replace(/{([^{}]*)}/g,
    (a, b) => {
      var r = getTokenValue(params, b);

      return typeof r === 'string' || typeof r === 'number' ? r : a;
    }
  )
  return t.replace(/"{([^{}]*)}"/g,
    (a, b) => {
      const r = getTokenValue(params, b);
      return r.constructor === Array ? r = JSON.stringify(r) : a;
    })
}

function getTokenValue(tokens, tokenName) {
  let tempTokens = tokens
  const tokenNameParts = tokenName.split('.')
  for (let key in tokenNameParts) {
    if (tempTokens.hasOwnProperty(tokenNameParts[key])) {
      tempTokens = tempTokens[tokenNameParts[key]]
    } else {
      return null
    }
  }
  return tempTokens
}

module.exports = {parseEsriSpec}
// parseVegaTemplate(vegaBarTemplate)

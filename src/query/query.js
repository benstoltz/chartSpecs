import { mixin } from '../helpers/utils'

/**
 * Build query from url & query object & query defaults
 *
 * @param {string} url - base url
 * @param {object} query - query from json spec input
 * @param {object} queryDefaults - optional
 *
 * @returns {string} - constructed query call
 */
export function buildQuery(url, query, queryDefaults = defaultQuery()) {
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

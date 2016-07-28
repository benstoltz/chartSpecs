import { rgbToHex } from './utils'
import _ from 'lodash'

export function buildMappings(series, axes, legend) {
  const mapping = {
    x: { field: series.x, label: filterAxes(series.horizontalAxisId, axes).title },
    y: { field: series.y, label: filterAxes(series.verticalAxisId, axes).title }
  }
  determineColor(series, mapping)
  return mapping
}

export function filterAxes(axisID, axes) {
  const filteredAxes = _.find(axes, {'id': axisID})
  return filteredAxes
}

export function filterVisualVariables(type, visualVariables) {
  return _.find(visualVariables, {'type': type})
}

export function determineSpec(series, specTemplates) {
  const type = whichSpec(series, specTemplates)
  return specTemplates[type[series.type]]
}

export function whichSpec(series, specTemplates) {
  const options = [{'barSeries': 'bar'}, {'lineSeries': 'line'}, {'scatterSeries': 'scatter'}, {'histogramSeries': 'histogram'}]
  const type = options.filter((type) => { return type.hasOwnProperty(series.type) })[0]
  return type
}

function determineColor(series, mapping) {
  if (!!series.visualVariables) {
    const colorInfo = filterVisualVariables('colorInfo', series.visualVariables)
    if (!!colorInfo) {
      mapping.color = { field: colorInfo.field, label: legend.title }
    }
  } else if (!!series.fillSymbol && !!series.fillSymbol.color) {

    const rgb = series.fillSymbol.color
    const hex = rgbToHex(rgb[0], rgb[1], rgb[2])
    mapping.color = { value: hex }
  } else if (!!series.lineSymbol && !!series.lineSymbol.color) {

    const rgb = series.lineSymbol.color
    mapping.color = { value: rgbToHex(rgb[0], rgb[1], rgb[2]) }
  }
  else {
    mapping.color = { value: "#0079c1" }
  }
}

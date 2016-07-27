import _ from 'lodash'

export function buildMappings(series, axes, legend) {
  const mapping = {
    x: { field: series.x, label: filterAxes(series.horizontalAxisId, axes).title },
    y: { field: series.y, label: filterAxes(series.verticalAxisId, axes).title }
  }
  if (!!series.visualVariables) {
    const colorInfo = filterVisualVariables('colorInfo', series.visualVariables)
    if (!!colorInfo) {
      mapping.color = { field: colorInfo.field, label: legend.title }
    }
  }
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

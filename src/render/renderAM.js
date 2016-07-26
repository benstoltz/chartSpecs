import AmCharts from 'amcharts3'

export function renderAm(spec, el) {
  return AmCharts.makeChart(el, spec)
}

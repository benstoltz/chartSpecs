var barChart = Cedar({
  "type": "vg",
  "spec": esriBarSpec
})
console.log('bar is: ', barChart)
barChart.show('#bar')
var bob = AmCharts.makeChart('amBar', barChart.amSpec)

// var lineChart = Cedar({
//   "type": "vg",
//   "spec": esriLineSpec
// })
// console.log('line is: ', lineChart)
// lineChart.show('#line')
//
// var scatterChart = Cedar({
//   "type": "vg",
//   "spec": esriScatterSpec
// })
// console.log('scatter is: ', scatterChart)
// scatterChart.show('#scatter')

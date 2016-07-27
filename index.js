// yay! global vars
var chartSpecInput = document.getElementById('chartSpec')
var specs = {
  bar: esriBarSpec,
  line: esriLineSpec,
  scatter: esriScatterSpec
}

// draw the chart from a spec
// and update the title
function drawChart(spec) {
  window.chart = Cedar({
    "type": "vg",
    "spec": spec
  })
  window.chart.show('#chart')
  if (spec.title) {
    document.getElementById('chartTitle').innerHTML = spec.title
  }
}

// update text area w/ formated spec JSON
// and update chart
function setSpec(spec) {
  chartSpecInput.value = JSON.stringify(spec, null, 4)
  drawChart(spec)
}

// show chart spec for that type of chart
// when any chart type button is clicked
Array.prototype.forEach.call(document.querySelectorAll('button[data-chart-type]'), function(btn) {
  var type = btn.getAttribute('data-chart-type');
  btn.addEventListener('click', function(e) {
    e.preventDefault()
    var spec = specs[type];
    setSpec(spec);
  })
})

// parse chart spec from form and re-draw chart
// when form is submited
document.getElementById('specForm').addEventListener('submit', function(e) {
  e.preventDefault()
  var chartSpec = JSON.parse(chartSpecInput.value);
  drawChart(chartSpec);
})

// show bar chart/spec initially
setSpec(esriBarSpec)

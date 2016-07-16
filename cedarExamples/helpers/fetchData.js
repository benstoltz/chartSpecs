const dl = require('datalib')
const url = 'http://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Demographic_WebMercator/MapServer/17/query?where=1%3D1&returnGeometry=false&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&outFields=*&f=json'
dl.json({url}, (err, data) => {
  if (err) {
    console.log(err)
  }
  const features = data.features
  console.log(features)
  const summary = dl.summary(features)
  console.log(summary)
})

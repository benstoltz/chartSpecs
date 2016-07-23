const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { parseEsriSpec } = require('./cedarExamples/helpers/generateVegaSpec')
const barChart = require('./cedarExamples/bar/esriBar')
const vegaBarTemplate = require('./cedarExamples/bar/cedarBar.json')

server.listen(8000)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  socket.on('esri spec', (spec) => {
    console.log(spec)
    const esriBar = parseEsriSpec(spec, vegaBarTemplate)
    io.emit('receive chart', esriBar)
  })
})

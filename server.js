const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, { serveClient: true })
const routes = require('./routes')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./index')(io)

for (let routeName in routes) {
  app.use(`/${routeName}`, routes[routeName])
}

server.listen(25555, () => console.log('listen on port 25555'))

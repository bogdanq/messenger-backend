const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, { serveClient: true })
const routes = require('./routes')
const logger = require('morgan')
const cors = require('cors')
const session = require('./middleware/session')
require('./index')(io)

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session)

for (let routeName in routes) {
  app.use(`/${routeName}`, routes[routeName])
}

server.listen(25555, () => console.log('listen on port 25555'))

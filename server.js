const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, { serveClient: true })
const routes = require('./routes')
const logger = require('morgan')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const MONGO_URI = 'mongodb://bogdan:1111111Q@ds119049.mlab.com:19049/messenger'

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())

require('./index')(io)

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(mongodb => mongodb)
  .catch(err => console.log('some error', err))

for (let routeName in routes) {
  app.use(`/${routeName}`, routes[routeName])
}

server.listen(25555, () => console.log('listen on port 25555'))

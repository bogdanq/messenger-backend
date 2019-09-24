const mongoose = require('mongoose')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')(expressSession)
const URL = 'mongodb://bogdan:1111111Q@ds119049.mlab.com:19049/messenger'

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(mongodb => mongodb)
  .catch(err => console.log('some error', err))

const options = {
  mongooseConnection: mongoose.connection
}

module.exports = expressSession({
  secret: 'secret key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 60 * 60 * 1000 },
  store: new MongoStore(options)
})
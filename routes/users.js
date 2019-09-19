const express = require('express')
const router = express.Router()

router.get('/current-user', (_, res) => {
  res.send(200, { status: 'ok' })
})

const userRoute = router

module.exports = userRoute

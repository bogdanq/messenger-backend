const express = require('express')
const router = express.Router()
const { getUsers } = require('../controllers/users')

router.get('/users', getUsers)

const userRoute = router

module.exports = userRoute

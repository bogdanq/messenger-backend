const express = require('express')
const router = express.Router()
const checkSession = require('../middleware/checkSession')
const { 
  getUsers,
  signUp,
  deleteUser,
  getCurrentUser,
  signIn,
  updateUser,
} = require('../controllers/users')

module.exports = router
  .get('/', getUsers)
  .get('/current-user/:id', checkSession, getCurrentUser)
  .post('/create-user', signUp)
  .post('/sign-in', signIn)
  .put('/update', checkSession, updateUser)
  .delete('/delete-user/:id', checkSession, deleteUser)

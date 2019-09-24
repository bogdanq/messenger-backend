const UserModel = require("../models/user")
const bcrypt = require('bcryptjs')
const { pick } = require('lodash')

const getUsers = async (_, response) => {
  try {
    const result = await UserModel.find()
    response.status(200).send({ data: result })
  } catch (e) {
    response.status(200).send({ error: true, message: "Ошибка запроса" })
  }
}

const signIn = async (request, response) => {
  const { email, password } = request.body
  const user = await UserModel.findOne({ email })

  if(!user || !bcrypt.compareSync(password, user.password)) {
    response.status(200).send({ error: true, message: "Не верный логин или пароль" })
  }

  request.session.user = user
  request.session.save()
  response.status(200).send({ data: request.session.user })
}

const signUp = async (request, response) => {
  try {
    const user = await UserModel.create(request.body)
    response.status(200).send({ data: user })
  } catch ({ message }) {
    response.status(200).send({ error: true, message })
  }
}

const deleteUser = async (request, response) => {
  try {
    const user = await UserModel.remove({
      _id: request.params.id
    })

    if(user.deletedCount > 0) {
      response.status(200).send({ data: user.deletedCount })
    } else {
      response.status(200).send({ error: true, message: 'Пользователь не найден' })
    }
  } catch ({ message }) {
    response.status(200).send({ error: true, message })
  }
}

const getCurrentUser = async (request, response) => {
  try {
    const user = await UserModel.findOne({ _id: request.params.id })
    response.status(200).send({ data: user })
  } catch (e) {
    response.status(200).send({ error: true, message: 'Пользователь не найден' })
  }
}

const updateUser = async (request, response) => {
  try {
    const userId = request.session.user._id
    const updateUserData = pick(request.body, UserModel.createFields);
    await UserModel.update({ _id: userId }, updateUserData)
    const user = await UserModel.findOne({ _id: userId })
    response.status(200).send({ data: user })
  } catch (e) {
    console.log(e)
    response.status(200).send({ error: true, message: 'Ошибка при обновлении пользователя' })
  }
}

module.exports = {
  getUsers,
  signUp,
  deleteUser,
  getCurrentUser,
  signIn,
  updateUser,
}

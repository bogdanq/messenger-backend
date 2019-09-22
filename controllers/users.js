const UserModel = require('../models/user')

const getUsers = async (_, response) => {
  try {
    const result = await UserModel.find()
    response.send(200, { data: result })
  } catch (e) {
    response.send(404, { message: 'Ошибка запроса' })
  }
}

module.exports = {
  getUsers,
}

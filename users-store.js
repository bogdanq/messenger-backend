module.exports = class UsersStore {
  constructor() {
    this.users = []
  }

  getUserList() {
    return this.users
  }

  getUserById(uid) {
    return this.users.find(user => user.uid === uid)
  }

  addUser(user) {
    this.users.push(user)
  }

  deleteUser(uid) {
    this.users = this.users.filter(user => user.uid !== uid)
  }
}

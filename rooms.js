module.exports = class ChatRoom {
  constructor(name) {
    this.name = name
    this.users = []
    this.messages = []
  }

  connectUser(newUser) {
    this.users.push(newUser)
  }

  getCurrentUser(uid) {
    return this.users.find(user => user.uid === uid)
  }

  getUsers() {
    return this.users
  }

  close(uid) {
    this.users = this.users.filter(user => user.uid !== uid)
  }
}

const ChatRoom = require('../rooms')
const UsersStore = require('../users-store')

const chatRoom = new ChatRoom('chat')
const usersStore = new UsersStore()

const checkUserForStore = uid => {
  const user = usersStore.getUserById(uid)
  if (user) {
    return user
  }
  return false
}
const checkUserForChat = uid => {
  const user = chatRoom.getCurrentUser(uid)
  if (user) {
    return user
  }
  return false
}

module.exports = class SocketController {
  constructor(socket) {
    this.socket = socket
  }

  signIn({ name, uid, room }) {
    usersStore.addUser({
      uid,
      name,
      currentRoom: room,
    })
    this.socket.to(chatRoom.name).emit('user login success', { name })
  }

  close({ name, uid }, successCb) {
    this.socket.leave(chatRoom.name)
    chatRoom.close(uid)

    const users = chatRoom.getUsers()

    this.socket.to(chatRoom.name).emit('user left', { name })
    this.socket.to(chatRoom.name).emit('online users list', { users })
    successCb && successCb({ users: chatRoom.getUsers() })
    console.log(`user ${name} exit`)
  }

  enterToChat({ name, uid }, successCb) {
    // const user = checkUserForStore(uid)
    // const userForChat = checkUserForChat(uid)

    // if (user && !userForChat) {
    //   chatRoom.connectUser(user)
    //   this.socket.join(chatRoom.name)

    //   const users = chatRoom.getUsers()

    //   this.socket.to(chatRoom.name).emit('user join', { name })
    //   this.socket.to(chatRoom.name).emit('online users list', { users })
    //   successCb({ users })
    //   console.log(`user ${name} insert the chat;`)
    // } else {
    //   console.log(`status: 404`)
    // }
    const user = usersStore.getUserById(uid)
    chatRoom.connectUser(user)
    this.socket.join(chatRoom.name)

    const users = chatRoom.getUsers()

    this.socket.to(chatRoom.name).emit('user join', { name })
    this.socket.to(chatRoom.name).emit('online users list', { users })
    successCb({ users })
  }

  sendMessage({ message, name, uid }, successCb) {
    const currentRoom = usersStore.getUserById(uid).currentRoom

    this.socket.to(currentRoom).emit('create message', { message, name })
    successCb({ message, name })
    console.log(`user ${name} send message - ${message}`)
  }
}

const SocketController = require('./controllers/socket')
const types = require('./constants')

module.exports = io => {
  io.on('connection', socket => {
    try {
      const socketController = new SocketController(socket)

      socket.on(types.LOGIN, ({ name, uid, room }) =>
        socketController.signIn({ name, uid, room }),
      )

      socket.on(types.OUT, ({ name, uid }, successCb) =>
        socketController.close({ name, uid }, successCb),
      )

      socket.on(types.ENTER_CHAT, ({ name, uid }, successCb) =>
        socketController.enterToChat({ name, uid }, successCb),
      )

      socket.on(types.LEAVE_CHAT, ({ name, uid }, successCb) =>
        socketController.close({ name, uid }, successCb),
      )

      socket.on(types.SEND_MESSAGE, ({ message, name, uid }, successCb) =>
        socketController.sendMessage({ message, name, uid }, successCb),
      )

      socket.on('disconnect', () =>
        socketController.close({ name: 'oolol', uid: socket.id }, null),
      )
    } catch (e) {
      console.log(new Error('some error'))
    }
  })
}

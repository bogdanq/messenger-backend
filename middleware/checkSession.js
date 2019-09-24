module.exports = checkSession = (req, res, next) => {
  if(!req.session.user) {
    throw new Error('user is not auth')
  }
  return next()
}
const AuthService = require('../services/auth.service')

const authenticate = (req, res, next) => {
  const auth = req.header('Authorization')

  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const splitToken = auth.split(' ')

  try {
    const tokenUser = AuthService.verifyToken(splitToken[1])
    req.user = tokenUser
    next()
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Invalid token', error})
  }
}

module.exports = authenticate

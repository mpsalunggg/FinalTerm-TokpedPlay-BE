const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey =
  process.env.SECRET_KEY || 'x0e9tYwQ$#kW45*8d1@!d8@s3dcnf0a21C!cXq'

const generateToken = (data) => {
  return jwt.sign(data, secretKey, { expiresIn: '2h' })
}

const verifyToken = (token) => {
  return jwt.verify(token, secretKey)
}

module.exports = {
    generateToken,
    verifyToken,
}

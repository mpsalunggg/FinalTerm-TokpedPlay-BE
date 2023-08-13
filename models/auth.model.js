const mongoose = require('mongoose')
const { Schema } = mongoose

const authSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
})

module.exports = mongoose.model('Auth', authSchema)

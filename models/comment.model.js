const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
  id_thumbnail: {
    require: true,
    type: Schema.Types.ObjectId,
  },
  username: {
    required: true,
    type: String,
  },
  comment: {
    required: true,
    type: String,
  },
  time_stamp: {
    required: true,
    type: Date,
  },
})

module.exports = mongoose.model('Comment', commentSchema)

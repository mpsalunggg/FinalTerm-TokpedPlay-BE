const mongoose = require('mongoose')
const { Schema } = mongoose

const thumbnailSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  url_img: {
    required: true,
    type: String,
  },
  url_video: {
    required: true,
    type: String,
  },
  created_at: {
    required: true,
    type: Date, 
  },
})

module.exports = mongoose.model('Thumbnail', thumbnailSchema)

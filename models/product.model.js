const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  id_thumbnail: {
    require: true,
    type: Schema.Types.ObjectId,
  },
  title: {
    required: true,
    type: String,
  },
  url_product: {
    required: true,
    type: String,
  },
  url_img: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  desc_product: {
    type: String,
  }
})

module.exports = mongoose.model('Product', productSchema)

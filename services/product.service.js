const ProductModel = require('../models/product.model')

const getAllProduct = async () => {
  try {
    const result = await ProductModel.find()
    return result
  } catch (err) {
    throw new Error('Terjadi Kesalahan Server!')
  }
}

const detailProduct = async (id) => {
  try {
    const result = await ProductModel.findById(id)
    return result
  } catch (err) {
    throw new Error('Terjadi Kesalahan Server!')
  }
}

const createProduct = async (
  id_thumbnail,
  title,
  url_product,
  price,
  desc_product,
  url_img
) => {
  const product = new ProductModel({
    id_thumbnail,
    title,
    url_product,
    url_img,
    price,
    desc_product,
  })
  try {
    const result = await product.save()
    return result
  } catch (err) {
    throw new Error('Terjadi Kesalahan Server!')
  }
}

const editProduct = async (
  id_product,
  title,
  url_product,
  price,
  desc_product,
  url_img
) => {
  const product = {
    title,
    url_product,
    url_img,
    price,
    desc_product,
  }
  const option = { new: true }

  try {
    const resultId = await ProductModel.findById(id_product)
    if (!resultId) {
      return null
    }
    const result = await ProductModel.findByIdAndUpdate(
      id_product,
      product,
      option
    )
    return result
  } catch (err) {
    throw new Error('Terjadi Kesalahan Server!')
  }
}

const deleteProduct = async (id_product) => {
  try {
    const result = await ProductModel.findById(id_product)
    if (!result) {
      return null
    }
    const deletedData = await ProductModel.findByIdAndDelete(id_product)
    return deletedData
  } catch (err) {
    throw new Error('Terjadi Kesalahan Server!')
  }
}

const productByThumbId = async (id_thumb) => {
  try {
    const result = await ProductModel.find({ id_thumbnail: id_thumb })
    return result
  } catch (err) {
    throw new Error('Terjadi Kesalahan Server!')
  }
}

module.exports = {
  getAllProduct,
  detailProduct,
  createProduct,
  editProduct,
  deleteProduct,
  productByThumbId,
}

const ProductModel = require('../models/product.model')
const ProductService = require('../services/product.service')

const getAllProduct = async (_, res) => {
  try {
    const result = await ProductService.getAllProduct()
    if (!result.length) {
      return res
        .status(404)
        .json({ message: 'Tidak Terdapat Data!', data: result })
    }
    res
      .status(201)
      .json({ message: 'Berhasil Mendapatkan Data!', data: result })
  } catch (err) {
    res.status(500).json({ message: 'Terjadi Kesalahan Server!' })
  }
}

const detailProduct = async (req, res) => {
  const id = req.params.id_product

  try {
    const result = await ProductService.detailProduct(id)
    if (!result) {
      return res
        .status(404)
        .json({ message: `Data tidak ditemukan dengan ID ${id}` })
    }
    res
      .status(201)
      .json({ message: 'Berhasil Mendapatkan Data!', data: result })
  } catch (err) {
    res.status(500).json({ message: 'Terjadi Kesalahan Server!' })
  }
}

const createProduct = async (req, res) => {
  const { title, url_product, price, desc_product, url_img } = req.body
  const id = req.params.id_thumb

  try {
    const result = await ProductService.createProduct(
      id,
      title,
      url_product,
      price,
      desc_product,
      url_img
    )
    res
      .status(201)
      .json({ message: 'Berhasil Menambahkan Product!', data: result })
  } catch (err) {
    res.status(500).json({ message: 'Terjadi Kesalahan Server!' })
  }
}

const editProduct = async (req, res) => {
  const { title, url_product, price, desc_product, url_img } = req.body
  const id = req.params.id_product

  try {
    const result = await ProductService.editProduct(
      id,
      title,
      url_product,
      price,
      desc_product,
      url_img
    )
    if (!result) {
      return res
        .status(404)
        .json({ message: `Data tidak ditemukan dengan ID ${id}` })
    }

    res.status(201).json({ message: 'Berhasil Merubah Data!', data: result })
  } catch (err) {
    res.status(500).json({ message: 'Terjadi Kesalahan Server!' })
  }
}

const deleteProduct = async (req, res) => {
  const id = req.params.id_product

  try {
    const deletedData = await ProductService.deleteProduct(id)
    if (!deletedData) {
      return res
        .status(404)
        .json({ message: `Data tidak ditemukan dengan ID ${id}` })
    }

    res
      .status(200)
      .json({
        message: `Berhasil menghapus Data dengan ID ${id}`,
        data: deletedData,
      })
  } catch (err) {
    res.status(500).json({ message: 'Terjadi Kesalahan Server!' })
  }
}

const productByThumbId = async (req, res) => {
  const id = req.params.id_thumb

  try {
    const result = await ProductService.productByThumbId(id)
    if (!result.length) {
      return res
        .status(404)
        .json({ message: 'Tidak Terdapat Product!', data: result })
    }
    res
      .status(201)
      .json({ message: 'Berhasil Mendapatkan Data!', data: result })
  } catch (err) {
    res.status(500).json({ message: 'Terjadi Kesalahan Server!' })
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

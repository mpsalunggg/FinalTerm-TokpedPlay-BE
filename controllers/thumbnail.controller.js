const ThumbnailService = require('../services/thumbnail.service')

const getAllThumbnail = async (_, res) => {
  try {
    const result = await ThumbnailService.getAllThumbnail()
    if (!result.length) {
      return res
        .status(404)
        .json({ message: 'Tidak Terdapat Data!', data: result })
    }
    res
      .status(201)
      .json({ message: 'Berhasil Mendapatkan Data!', data: result})
  } catch (err) {
    res.status(500).json({ message: 'Terjadi Kesalahan Server!' })
  }
}

const detailThumbnail = async (req, res) => {
  const id = req.params.id_thumb

  try {
    const result = await ThumbnailService.getThumbnailById(id)
    if (!result) {
      return res
        .status(404)
        .json({ message: `Data tidak ditemukan dengan ID ${id}` })
    }
    res
      .status(201)
      .json({ message: 'Berhasil Mendapatkan Detail Data!', data: result })
  } catch (err) {
    res.status(500).json({ message: 'Terjadi Kesalahan Server!' })
  }
}

const createThumbnail = async (req, res) => {
  const { title, url_img, url_video } = req.body

  try {
    const result = await ThumbnailService.createThumbnail(
      title,
      url_img,
      url_video,
    )
    res
      .status(201)
      .json({ message: 'Berhasil Menambahkan Thumbnail!', data: result })
  } catch (err) {
    res.status(500).json({ message: 'Terjadi Kesalahan Server!' })
  }
}

const editThumbnail = async (req, res) => {
  const { url_img, url_video, title } = req.body
  const id = req.params.id_thumb

  try {
    const result = await ThumbnailService.editThumbnail(
      id,
      title,
      url_img,
      url_video
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

const deleteThumbnail = async (req, res) => {
  const id = req.params.id_thumb

  try {
    const result = await ThumbnailService.deleteThumbnail(id)
    if (!result) {
      return res
        .status(404)
        .json({ message: `Data tidak ditemukan dengan ID ${id}` })
    }

    res.status(201).json({
      message: `Berhasil menghapus Data dengan ID ${id}`,
      data: result,
    })
  } catch (err) {
    res.status(500).json({ message: 'Terjadi Kesalahan Server!' })
  }
}

const searchThumbnailByTitle = async (req, res) => {
  const { title } = req.query

  try {
    if (!title || title.trim() === '') {
      return res
        .status(400)
        .json({ message: 'Parameter pencarian tidak valid!' })
    }

    const result = await ThumbnailService.searchThumbnailByTitle(title)
    if (!result.length) {
      return res
        .status(404)
        .json({
          message: 'Tidak ditemukan thumbnail dengan judul yang sesuai!',
        })
    }

    res
      .status(200)
      .json({ message: 'Berhasil Mendapatkan Data!', data: result })
  } catch (err) {
    res.status(500).json({ message: 'Terjadi Kesalahan Server!' })
  }
}

module.exports = {
  getAllThumbnail,
  detailThumbnail,
  createThumbnail,
  editThumbnail,
  deleteThumbnail,
  searchThumbnailByTitle,
}

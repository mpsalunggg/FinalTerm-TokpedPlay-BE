const ThumbnailModel = require('../models/thumbnail.model')

const getAllThumbnail = async () => {
  try {
    const result = await ThumbnailModel.find()
    return result
  } catch (err) {
    throw new Error('Terjadi Kesalahan Server!')
  }
}

const getThumbnailById = async (id) => {
  try {
    const result = await ThumbnailModel.findById(id)
    return result
  } catch (err) {
    throw new Error('Terjadi Kesalahan Server!')
  }
}

const createThumbnail = async (title, url_img, url_video) => {
  const thumbnail = new ThumbnailModel({
    title,
    url_img,
    url_video,
    created_at: Date.now(),
  })

  try {
    const result = await thumbnail.save()
    return result
  } catch (err) {
    throw new Error('Terjadi Kesalahan Server!')
  }
}

const editThumbnail = async (id, title, url_img, url_video) => {
  const thumbnail = {
    title,
    url_img,
    url_video,
  }

  const option = { new: true }

  try {
    const resultId = await ThumbnailModel.findById(id)
    if (!resultId) {
      return null
    }

    const result = await ThumbnailModel.findByIdAndUpdate(id, thumbnail, option)
    return result
  } catch (err) {
    throw new Error('Terjadi Kesalahan Server!')
  }
}

const deleteThumbnail = async (id) => {
  try {
    const result = await ThumbnailModel.findById(id)
    if (!result) {
      return null
    }

    const deletedData = await ThumbnailModel.findByIdAndDelete(id)
    return deletedData
  } catch (err) {
    throw new Error('Terjadi Kesalahan Server!')
  }
}

const searchThumbnailByTitle = async (query) => {
  try {
    const result = await ThumbnailModel.find({
      title: { $regex: query, $options: 'i' },
    })
    return result
  } catch (err) {
    throw new Error('Terjadi Kesalahan Server!')
  }
}

module.exports = {
  getAllThumbnail,
  getThumbnailById,
  createThumbnail,
  editThumbnail,
  deleteThumbnail,
  searchThumbnailByTitle,
}

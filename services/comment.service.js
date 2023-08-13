const CommentModel = require('../models/comment.model')

const getAllComment = async () => {
  try {
    const result = await CommentModel.find()
    return result
  } catch (err) {
    throw new Error('Terjadi Kesalahan Server!')
  }
}

const createComment = async (id_thumbnail, username, comment) => {
  const commentData = new CommentModel({
    id_thumbnail,
    username,
    comment,
    time_stamp: Date.now(),
  })
  try {
    const result = await commentData.save()
    return result
  } catch (err) {
    console.log(err)
    throw new Error('Terjadi Kesalahan Server!')
  }
}

const deleteComment = async (id) => {
  try {
    const result = await CommentModel.findById(id)
    if (!result) {
      return null
    }
    const deletedData = await CommentModel.findByIdAndDelete(id)
    return deletedData
  } catch (err) {
    throw new Error('Terjadi Kesalahan Server!')
  }
}

const commentByThumbId = async (id) => {
  try {
    const result = await CommentModel.find({ id_thumbnail: id })
    return result
  } catch (err) {
    throw new Error('Terjadi Kesalahan Server!')
  }
}

module.exports = {
  getAllComment,
  createComment,
  deleteComment,
  commentByThumbId,
}

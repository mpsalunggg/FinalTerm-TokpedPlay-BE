const CommentService = require('../services/comment.service')

const getAllComment = async (req, res) => {
  try {
    const result = await CommentService.getAllComment()
    if (!result.length) {
      return res
        .status(404)
        .json({ message: 'Tidak Terdapat Data!', data: result })
    }
    res
      .status(201)
      .json({ message: 'Berhasil Mendapatkan Data!', data: result })
  } catch (err) {
    console.log({ err })
    res.status(500).json({ message: 'Terjadi Kesalahan Server!' })
  }
}

const createComment = async (req, res) => {
  const { comment } = req.body
  const id_thumbnail = req.params.id_thumb

  try {
    const result = await CommentService.createComment(
      id_thumbnail,
      req.user.username,
      comment
    )
    res
      .status(201)
      .json({ message: 'Berhasil Menambahkan Comment!', data: result })
  } catch (err) {
    res.status(500).json({ message: 'Terjadi Kesalahan Server!' })
  }
}

const deleteComment = async (req, res) => {
  const id = req.params.id_comment

  try {
    const deletedData = await CommentService.deleteComment(id)
    if (!deletedData) {
      return res
        .status(404)
        .json({ message: `Data tidak ditemukan dengan ID ${id}` })
    }
    res.status(201).json({
      message: `Berhasil menghapus Data dengan ID ${id}`,
      data: deletedData,
    })
  } catch (err) {
    res.status(500).json({ message: 'Terjadi Kesalahan Server!' })
  }
}

const commentByIdThumb = async (req, res) => {
  const id = req.params.id_thumb

  try {
    const result = await CommentService.commentByThumbId(id)
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

module.exports = {
  getAllComment,
  createComment,
  deleteComment,
  commentByIdThumb,
}

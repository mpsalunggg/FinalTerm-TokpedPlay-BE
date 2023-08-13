const bcrypt = require('bcrypt')
const AuthModel = require('../models/auth.model')
const AuthService = require('../services/auth.service')
const sharp = require('sharp')

const registerUser = async (req, res) => {
  try {
    const { email, password, username } = req.body

    const hashPass = await bcrypt.hash(password, 10)
    const data = {
      email,
      password: hashPass,
      username,
      profile: req.file ? req.file.filename : '',
    }
    const existingUser = await AuthModel.findOne({ email })
    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'Email sudah ada, Masukkan email yang berbeda!' })
    }
    const user = new AuthModel(data)
    const result = await user.save()
    res.status(200).json({
      message: 'User Berhasil Terdaftar!',
      result,
    })
  } catch (err) {
    res.status(500).json({ message: 'Terjadi Kesalahan Server!' })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await AuthModel.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Email anda salah!' })
    }
    const matchingPass = await bcrypt.compare(password, user.password)
    if (!matchingPass) {
      return res.status(401).json({ message: 'Password anda salah!' })
    }

    const data = {
      _id: user._id,
      email: user.email,
      username: user.username,
    }
    const tokenUser = AuthService.generateToken(data)

    res.status(200).json({
      message: 'Login Berhasil Yeyy!',
      data: { ...data, profile: user.profile },
      tokenUser,
    })
  } catch (err) {
    res.status(500).json({ message: 'Terjadi Kesalahan Server!' })
  }
}

const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id_user
    const data = {}

    const uploadedFile = req.file

    if (uploadedFile) {
      const compressedImageBuffer = await sharp(uploadedFile.buffer)
        .resize({ width: 400 })
        .toBuffer()

      const base64CompressedImage = compressedImageBuffer.toString('base64')

      data.profile =
        `data:${uploadedFile.mimetype};base64,` + base64CompressedImage
    }

    const updatedUser = await AuthModel.findByIdAndUpdate(userId, data, {
      new: true,
    })
    res.status(201).json({
      message: 'Update data berhasil!',
      data
    })
  } catch (error) {
    res.status(500).json({ message: 'Terjadi Kesalahan Server!' })
  }
}

const getProfile = async (req, res) => {
  try {
    const userId = req.params.id_user
    const user = await AuthModel.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan!' })
    }

    const profile = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profile: user.profile,
    }
    res
      .status(200)
      .json({ message: 'Berhasil Mendapatkan Data!', data: profile })
  } catch (error) {
    res.status(500).json({ message: 'Terjadi Kesalahan Server!' })
  }
}

module.exports = {
  registerUser,
  loginUser,
  updateProfile,
  getProfile,
}

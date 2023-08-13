const express = require('express')
const router = express.Router()
const { upload } = require('../config/multer')
const AuthMiddleware = require('../middleware/auth.middleware')
const ProductController = require('../controllers/product.controller')
const ThumbController = require('../controllers/thumbnail.controller')
const CommentController = require('../controllers/comment.controller')
const AuthController = require('../controllers/auth.controller')

router.use(AuthMiddleware)

// Thumbnail
router.post('/thumbnail', ThumbController.createThumbnail)
router.put('/thumbnail/:id_thumb', ThumbController.editThumbnail)
router.delete('/thumbnail/:id_thumb', ThumbController.deleteThumbnail)

// Product
router.post('/product/:id_thumb', ProductController.createProduct)
router.put('/product/:id_product', ProductController.editProduct)
router.delete('/product/:id_product', ProductController.deleteProduct)

// Comment
router.post('/comment/:id_thumb', CommentController.createComment)
router.delete('/comment/:id_comment', CommentController.deleteComment)

//Profile
router.put(
  '/update-profile/:id_user',
  upload.single('profile'),
  AuthController.updateProfile
)


module.exports = router

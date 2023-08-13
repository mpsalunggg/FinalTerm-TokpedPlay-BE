const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product.controller')
const ThumbController = require('../controllers/thumbnail.controller')
const CommentController = require('../controllers/comment.controller')
const AuthController = require('../controllers/auth.controller')

// Thumbnail
router.get('/thumbnail', ThumbController.getAllThumbnail)
router.get('/thumbnail/search', ThumbController.searchThumbnailByTitle)
router.get('/thumbnail/:id_thumb', ThumbController.detailThumbnail)

// Product
router.get('/product', ProductController.getAllProduct)
router.get('/product/:id_product', ProductController.detailProduct)
router.get('/product/thumbnail/:id_thumb', ProductController.productByThumbId)

// Comment
router.get('/comment', CommentController.getAllComment)
router.get('/comment/:id_thumb', CommentController.commentByIdThumb)

// User
router.get('/get-profile/:id_user', AuthController.getProfile)


module.exports = router
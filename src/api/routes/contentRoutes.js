import express from 'express'
import { getPosts } from '../controllers/contentController.js'

const router = express.Router()

// Route để lấy bài viết từ WPGraphQL
router.get('/posts', getPosts)

export default router

const express = require('express');
const postControllers = require('../controllers/post.controller.js');

const router = express.Router();

router.get("/posts", postControllers.getAllPosts);

module.exports = router;

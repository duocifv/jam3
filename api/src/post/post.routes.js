const express = require("express");
const { posts } = require("./post.controller.js");
const router = express.Router();

router.get("/posts", posts);

module.exports = router;

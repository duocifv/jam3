const express = require("express");
const {
  login,
  profile,
  logout,
  register,
  forgot,
  reset,
  refreshToken
} = require("./auth.controller.js");
const authenticate = require('./auth.middleware.js');
const router = express.Router();

router.post("/login", login);
router.post('/refresh-token', refreshToken);
router.get("/profile", authenticate, profile);
router.post("/logout", logout);
router.post("/register", register);
router.post("/forgot", forgot);
router.post("/reset", reset);

module.exports = router;

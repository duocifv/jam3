const express = require("express");
const {
  login,
  profile,
  logout,
  register,
  forgot,
  reset,
} = require("./auth.controller.js");
const router = express.Router();

router.post("/login", login);
router.get("/profile", profile);
router.post("/logout", logout);
router.post("/register", register);
router.post("/forgot", forgot);
router.post("/reset", reset);

module.exports = router;

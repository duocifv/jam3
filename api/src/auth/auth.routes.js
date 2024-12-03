const express = require("express");
const {
  login,
  profile,
  register,
  forgot,
  reset,
  refreshToken,
} = require("./auth.controller.js");
const authenticate = require("../middleware/auth.middleware.js");
const { body } = require("express-validator");
const { validate } = require("../middleware/validate.middleware.js");

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refreshToken);
router.get("/profile", authenticate, profile);
router.post(
  "/register",
  body("user_email")
    .notEmpty()
    .withMessage("Email không được để trống.")
    .isEmail()
    .withMessage("Email không hợp lệ."),
  body("display_name")
    .trim()
    .notEmpty()
    .withMessage("Tên người dùng không được để trống.")
    .isLength({ min: 6 })
    .withMessage("Tên người dùng phải có ít nhất 6 ký tự.")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "Tên người dùng chỉ được phép chứa chữ cái, số và dấu gạch dưới."
    ),
  body("user_pass")
    .notEmpty()
    .withMessage("Mật khẩu không được để trống.")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu phải có ít nhất 6 ký tự.")
    .matches(/[a-z]/)
    .withMessage("Mật khẩu phải chứa ít nhất một chữ cái.")
    .matches(/[0-9]/)
    .withMessage("Mật khẩu phải chứa ít nhất một số.")
    .matches(/[\W_]/)
    .withMessage("Mật khẩu phải chứa ít nhất một ký tự đặc biệt."),
  validate,
  register
);
router.post(
  "/forgot",
  body("user_email")
    .notEmpty()
    .withMessage("Email không được để trống.")
    .isEmail()
    .withMessage("Email không hợp lệ."),
  validate,
  forgot
);
router.post(
  "/reset",
  body("user_email")
    .notEmpty()
    .withMessage("Email không được để trống.")
    .isEmail()
    .withMessage("Email không hợp lệ."),
  validate,
  reset
);

module.exports = router;

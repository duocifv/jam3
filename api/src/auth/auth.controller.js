const {
  userLogin,
  createAccessToken,
  createRefreshToken,
  refreshAccessToken,
  userRegister,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("./auth.service.js");
const { cookieConfig } = require("../config.js");
const message = require("http-errors");

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await userLogin(username, password);
    // Tạo Access Token và Refresh Token
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    res.cookie("refreshToken", refreshToken, cookieConfig);

    res.json({
      message: "Đăng nhập thành công",
      accessToken: accessToken, // Gửi Access Token cho client
    });
  } catch (error) {
    return next(message(400, "Thông tin đăng nhập sai!"));
  }
};

exports.register = async (req, res, next) => {
  const { user_login, user_email, user_pass } = req.body;
  try {
    const result = await userRegister({
      user_login,
      user_pass,
      user_email,
      display_name,
    });
    if (!result) return next(message(400, "Đăng ký thất bại!"));
    res.json({ message: "Đăng ký thành công", result });
  } catch (error) {
    return next(message(400, error.message || "Đã có lỗi xảy ra"));
  }
};

// Refresh Token
exports.refreshToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return next(message(401, "Không có refresh token"));
  }

  try {
    const accessToken = await refreshAccessToken(refreshToken); // Tạo access token mới từ refresh token
    res.json({
      accessToken: accessToken, // Gửi access token mới
    });
  } catch (err) {
    return next(err); // Trả về lỗi nếu có
  }
};

exports.profile = (req, res) => {
  if (!req.user) {
    return next(message(401, "Không tìm thấy người dùng"));
  }

  // Trả về thông tin người dùng
  res.json({
    message: "Thông tin người dùng",
    user: {
      id: req.user.id,
      username: req.user.username,
      // Thêm các trường khác nếu cần
    },
  });
};

// Yêu cầu quên mật khẩu
exports.forgot = async (req, res, next) => {
  const { user_email } = req.body;
  try {
    const result = await forgotPassword(user_email);
    res.status(200).json(result);
  } catch (error) {
    return next(message(400, error.message));
  }
};

// Đặt lại mật khẩu
exports.reset = (req, res) => {
  const { token } = req.params;
  const { user_pass } = req.body;
  try {
    const { message } = resetPassword(token, user_pass);
    res.status(200).json({ message});
  } catch (error) {
    return next(message(400, error.message));
  }
};

exports.change = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;
  try {
    const { message } = await changePassword(userId, oldPassword, newPassword);
    return res.status(200).json({ message });
  } catch (error) {
    return next(message(400, error.message));
  }
};
const {
  userLogin,
  authenticateUser,
  createAccessToken,
  createRefreshToken,
  refreshAccessToken,
  userLogout,
  userRegister,
  forgotPassword,
  resetPassword,
} = require("./auth.service.js");

const err = require('http-errors');

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await authenticateUser(username, password);
  
     // Tạo Access Token và Refresh Token
     const accessToken = createAccessToken(user);
     const refreshToken = createRefreshToken(user);

      // Lưu refresh token vào cookie (HTTPOnly cookie để tránh bị client JavaScript truy cập)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Chỉ bật secure ở môi trường sản xuất
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });

   res.json({
      message: 'Đăng nhập thành công',
      accessToken: accessToken, // Gửi Access Token cho client
    });

  } catch (error) {
   return next(err(400, 'Thông tin đăng nhập sai!'));
  }
};

// Refresh Token
exports.refreshToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken; // Lấy refresh token từ cookie

  if (!refreshToken) {
    return next(err(401, 'Không có refresh token'));
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
  // req.user được xác định trong middleware authenticate, chứa thông tin người dùng
  if (!req.user) {
    return res.status(401).json({ message: 'Không tìm thấy người dùng' });
  }

  // Trả về thông tin người dùng
  res.json({
    message: 'Thông tin người dùng',
    user: {
      id: req.user.id,
      username: req.user.username,
      // Thêm các trường khác nếu cần
    },
  });
};

exports.logout = async (req, res) => {
  try {
    await userLogout(req);
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out" });
  }
};

exports.register = async (req, res, next) => {
  const { email, username, password, firstName, lastName } = req.body;
  try {
    const result = await userRegister( email, username, password, firstName, lastName);
    if(!result?.ok) {
      return next(err(409, result.message));
    }else {
      return res.status(201).json(result);
    }
  } catch (error) {
    return next(err(400, error.message || 'Đã có lỗi xảy ra'));
  }
};

// Yêu cầu quên mật khẩu
exports.forgot = (req, res) => {
  const { email } = req.body;
  try {
    const response = forgotPassword(email);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Đặt lại mật khẩu
exports.reset = (req, res) => {
  const { email, token, newPassword } = req.body;

  try {
    const user = resetPassword(email, token, newPassword);
    res.status(200).json({ message: "Password reset successful", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

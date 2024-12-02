const jwt = require('jsonwebtoken');
const message = require('http-errors');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Lấy token từ header Authorization

  if (!token) {
    return next(err(401, 'Token không hợp lệ'));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return next(message(401, 'Token không hợp lệ hoặc hết hạn'));
    }

    req.user = decoded; // Lưu thông tin người dùng vào req.user
    next(); // Tiếp tục đến controller
  });
};

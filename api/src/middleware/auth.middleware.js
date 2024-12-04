const jwt = require("jsonwebtoken");
const message = require("http-errors");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Lấy token từ header Authorization

  if (!token) {
    return next(err(403, "Không có quyền truy cập"));
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return next(message(401, "Token không hợp lệ hoặc hết hạn"));
    }
    req.user = decoded;
    next();
  });
};

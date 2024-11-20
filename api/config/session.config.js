const session = require("express-session");

module.exports = session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, // Đảm bảo cookie không thể truy cập từ JavaScript
    secure: false, // Đặt true nếu bạn sử dụng HTTPS
    maxAge: 3600000, // Cookie sẽ hết hạn sau 1 giờ
    sameSite: "Strict", // Giới hạn cookie chỉ trong cùng một miền
  },
});

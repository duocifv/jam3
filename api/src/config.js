const { Sequelize } = require("sequelize");

require("dotenv").config();

// Tạo kết nối Sequelize
const sequelize = new Sequelize("my_database", "root", "132132", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false,
  pool: {
    max: 5, // Số lượng kết nối tối đa trong pool
    min: 0, // Số lượng kết nối tối thiểu trong pool
    acquire: 30000, // Thời gian tối đa để lấy một kết nối từ pool
    idle: 10000, // Thời gian tối đa trước khi một kết nối không sử dụng bị đóng
  },
});

// Kiểm tra kết nối
sequelize
  .authenticate()
  .then(() => console.log("Kết nối thành công đến MySQL!"))
  .catch((err) => console.error("Không thể kết nối:", err));

module.exports = sequelize;

exports.cookieConfig = {
  httpOnly: true,
  // secure: process.env.NODE_ENV === "production", // Chỉ bật trong môi trường production
  secure: false,
  sameSite: "Lax",
  sameSite: "Strict", // Chặn CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000, // Thời gian sống 7 ngày
};



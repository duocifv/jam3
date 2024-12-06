import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Tạo kết nối Sequelize
const sequelize = new Sequelize("my_database", "root", "132132", {
  dialect: "sqlite",
  storage: "./database.sqlite", // Đường dẫn đến file SQLite
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
  .then(() => console.log("Kết nối thành công đến SQLite!"))
  .catch((err: unknown) => console.error("Không thể kết nối:", err));

// Cấu hình cookie
export const cookieConfig: {
  httpOnly: boolean;
  secure: boolean;
  sameSite: boolean | "none" | "lax" | "strict";
  maxAge: number;
} = {
  httpOnly: true,
  // secure: process.env.NODE_ENV === "production", // Chỉ bật trong môi trường production
  secure: false,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // Thời gian sống 7 ngày
};

export default sequelize;

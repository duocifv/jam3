// Import hàm từ repository
const crypto = require('crypto');
const {
  findByUsername,
  addUser,
  findByEmail,
  updatePassword,
} = require("./auth.repository.js");

const resetTokens = new Map(); // email => token

// Gửi mã xác nhận qua email (mock)
const sendResetEmail = (email, token) => {
  console.log(`Gửi email đến ${email} với mã xác nhận: ${token}`);
};

// Hàm xử lý đăng nhập
exports.userLogin = (username, password) => {
  const user = findByUsername(username);
  if (!user || user.password !== password) {
    throw new Error("Invalid credentials");
  }
  return user; // Trả về thông tin người dùng
};

// Hàm xử lý đăng xuất
exports.userLogout = (req) => {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

exports.userRegister = (username, password) => {
  // Kiểm tra xem username đã tồn tại chưa
  const existingUser = findByUsername(username);
  if (existingUser) {
    throw new Error("Username already exists");
  }

  // Lưu người dùng mới
  const newUser = addUser(username, password);
  return newUser;
};

// Yêu cầu quên mật khẩu
exports.forgotPassword = (email) => {
  const user = findByEmail(email);
  if (!user) {
    throw new Error("Email not found");
  }

  // Tạo token ngẫu nhiên
  const token = crypto.randomBytes(20).toString("hex");
  resetTokens.set(email, token);

  // Gửi email với token
  sendResetEmail(email, token);
  return { message: "Password reset email sent" };
};

// Đặt lại mật khẩu
exports.resetPassword = (email, token, newPassword) => {
  const validToken = resetTokens.get(email);
  if (!validToken || validToken !== token) {
    throw new Error("Invalid or expired token");
  }

  // Cập nhật mật khẩu mới
  const updatedUser = updatePassword(email, newPassword);
  resetTokens.delete(email); // Xóa token sau khi sử dụng
  return updatedUser;
};

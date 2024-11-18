// Giả lập dữ liệu người dùng
const users = [
  { id: 1, username: 'admin', password: 'admin', email: 'admin@example.com' },
  { id: 2, username: 'user', password: 'user', email: 'user@example.com' },
];

// Hàm tìm người dùng theo username
exports.findByUsername = (username) => {
  return users.find((user) => user.username === username);
};

// Lưu người dùng mới
exports.addUser = (username, password) => {
  const newUser = {
    id: users.length + 1, // Tạo ID tự tăng
    username,
    password,
  };
  users.push(newUser);
  return newUser;
};

// Tìm người dùng theo email
exports.findByEmail = (email) => {
  return users.find((user) => user.email === email);
};

// Đặt lại mật khẩu
exports.updatePassword = (email, newPassword) => {
  const user = users.find((user) => user.email === email);
  if (user) {
    user.password = newPassword;
  }
  return user;
};
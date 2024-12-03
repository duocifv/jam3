// Import hàm từ repository
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const err = require('http-errors');

const {
  findByUsername,
  addUser,
  getUserByUsername,
  findByEmail,
  updatePassword,
  RegisterUser
} = require("./auth.repository.js");

const resetTokens = new Map(); // email => token

// Gửi mã xác nhận qua email (mock)
const sendResetEmail = (email, token) => {
  console.log(`Gửi email đến ${email} với mã xác nhận: ${token}`);
};

// Hàm xử lý đăng nhập
exports.userLogin = async (username, password) => {
  const user = await findByUsername(username, password);
  if (!user) {
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

exports.userRegister = async (email, username, password, firstName,lastName) => {
  let result
  // Kiểm tra xem username đã tồn tại chưa
  const existingUser = await RegisterUser(email, username, password, firstName,lastName);
  
  if(existingUser?.user) {
    result = {
      ok: true,
      message: "Đăng ký thành công",
      user: existingUser?.user || {}
    }
  }

  if(existingUser?.message) {
    result = {
      ok: false,
      message: existingUser?.message,
      user: {}
    }
  }
  
  return  result
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




// Tạo Access Token
exports.createAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username }, 
    process.env.ACCESS_TOKEN_SECRET, 
    { expiresIn: '10s' } // Thời gian sống của Access Token (1 giờ)
  );
};

// Tạo Refresh Token
exports.createRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' } // Thời gian sống của Refresh Token (7 ngày)
  );
};



exports.authenticateUser = async (username, password) => {
  // Lấy người dùng từ cơ sở dữ liệu
  const user = await getUserByUsername(username);
  
  if (!user) {
    throw new Error('Username or password is incorrect');  // Nếu không tìm thấy người dùng, ném lỗi
  }

  // So sánh mật khẩu người dùng nhập với mật khẩu đã mã hóa
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Username or password is incorrect');  // Nếu mật khẩu không khớp, ném lỗi
  }

  return user;  // Trả về token
};


// Refresh Token: Tạo lại Access Token từ Refresh Token
exports.refreshAccessToken = async (refreshToken) => {
 
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return reject(err); // Token không hợp lệ
      }
      
       // Kiểm tra dữ liệu decoded
       if (!decoded.id || !decoded.username) {
        return reject(new Error('Invalid token payload'));
      }
     
      const accessToken = jwt.sign(
        { id: decoded.id, username: decoded.username }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: '1h' } 
      );
      resolve(accessToken);
    });
  });
};

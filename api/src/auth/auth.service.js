const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const err = require("http-errors");
const mailer = require("../config.js");
const nodemailer = require("nodemailer");

const {
  findByUsername,
  findByEmail,
  findByUserAndEmail,
  changeUserPass,
  createUser,
  updatePassword,
  findUserById,
} = require("./auth.repository.js");

const transporter = nodemailer.createTransport({
  host: "uhf41-22158.azdigihost.com", // Máy chủ gửi email
  port: 465, // Cổng SMTP
  secure: true,
  tls: {
    rejectUnauthorized: false, // Đảm bảo không có vấn đề về chứng chỉ
  },
  auth: {
    user: "admin@duocnv.top", // Email của bạn
    pass: "Khanh132!!", // Mật khẩu email
  },
});

// Hàm xử lý đăng nhập
exports.userLogin = async (username, password) => {
  const user = await findByUsername(username, password);
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isMatch = await bcrypt.compare(password, user.user_pass);
  if (!isMatch) {
    throw new Error("Username or password is incorrect");
  }
  return user;
};

exports.userProfile = async (token) => {
  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  console.log("decoded decoded", decoded);
  if (!decoded?.username) {
    throw new Error("username not initialized");
  }
  const user = await findByUsername(decoded.username);
  return user;
};

exports.userRegister = async (body) => {
  const checkUser = await findByUserAndEmail(body);
  if (checkUser) {
    throw new Error("Tên người dùng hoặc email đã tồn tại!");
  }
  const hashedPassword = await bcrypt.hash(body.user_pass, 10);
  const newUser = await createUser({ ...body, hashedPassword });
  if (!newUser) {
    throw new Error("Không thể đăng ký");
  }
  return newUser;
};

// Yêu cầu quên mật khẩu
exports.forgotPassword = async (user_email) => {
  const user = await findByEmail(user_email);

  if (!user) {
    console.log("Email not found");
    throw new Error("Email not found")
  }
  const token = jwt.sign(
    { userId: user.dataValues.ID },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  const resetLink = `http://localhost:3001/auth/reset/${token}`;
  const mailOptions = {
    from: "admin@duocnv.top",
    to: user.dataValues.user_email,
    subject: "Reset Mật Khẩu",
    text: `Vui lòng nhấp vào liên kết sau để reset mật khẩu của bạn: ${resetLink}`,
    html: `<b>Hello world? ${resetLink}</b>`, // html body
  };
  try {
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Email sending failed:", err);
        return;
      }
      console.log("Email sent successfully:", info.response);
    });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    throw new Error("Đã xảy ra lỗi khi gửi email");
  }
  return { message: "Password reset email sent" };
};

// Đặt lại mật khẩu
exports.resetPassword = async (token, password) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await changeUserPass(decoded.userId, hashedPassword);
    if (!user) {
      throw new Error("Không tìm thấy User");
    }
    return user;
  } catch (error) {
    throw new Error("Lỗi server Reset Password");
  }
};

// Tạo Refresh Token
exports.createRefreshToken = (user) => {
  return jwt.sign(
    { id: user.ID, user_login: user.user_login },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } // Thời gian sống của Refresh Token (7 ngày)
  );
};

// Refresh Token: Tạo lại Access Token từ Refresh Token
exports.refreshAccessToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return reject(err); // Token không hợp lệ
        }

        // Kiểm tra dữ liệu decoded
        if (!decoded.ID || !decoded.user_login) {
          return reject(new Error("Invalid token payload"));
        }

        const accessToken = jwt.sign(
          { id: decoded.ID, user_login: decoded.user_login },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        resolve(accessToken);
      }
    );
  });
};

// Tạo Access Token
exports.createAccessToken = (user) => {
  return jwt.sign(
    { id: user.ID, user_login: user.user_login },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" } // Thời gian sống của Access Token (1 giờ)
  );
};

exports.changePassword = async (userId, oldPassword, newPassword) => {
  try {
    const user = await findUserById(userId);
    if (!user) {
      throw new Error("Không tìm thấy user.");
    }
    const isMatch = await bcrypt.compare(oldPassword, user.user_pass);
    if (!isMatch) {
      throw new Error("Mật khẩu cũ không chính xác.");
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const result = await updatePassword(userId, hashedNewPassword);
    if (!result) {
      throw new Error("Cập nhật mật khẩu không thành công.");
    }
    return { message: "Mật khẩu đã được thay đổi thành công." };
  } catch (error) {
    throw new Error(error.message || "Lỗi thay đổi mật khẩu.");
  }
};

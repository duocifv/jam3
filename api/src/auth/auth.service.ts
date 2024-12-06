import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
  changeUserPass,
  createUser,
  findByEmail,
  findByUserAndEmail,
  findByUsername,
  findUserById,
  updatePassword,
} from "./auth.repository";

dotenv.config();

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  SMTP_HOST,
  SMTP_USER,
  SMTP_PORT,
  SMTP_PASS,
  JWT_SECRET,
} = process.env;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

const host = SMTP_HOST as string;
const port = Number(SMTP_PORT);
const user =SMTP_USER as string;
const pass = SMTP_PASS as string;

const transporter = nodemailer.createTransport({
  host,
  port,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user,
    pass,
  },
  secure: port === 465,
} as any);


// Hàm xử lý đăng nhập
export const userLogin = async (username: string, password: string) => {
  const user = await findByUsername(username);
  if (!user) {
    throw new Error("Tài khoản không đúng");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Mật khẩu không đúng");
  }
  return user;
};

export const userProfile = async (token: string) => {
  const decoded: any = jwt.verify(token, REFRESH_TOKEN_SECRET as string);
  if (!decoded?.username) {
    throw new Error("username not initialized");
  }
  const user = await findByUsername(decoded.username);
  return user;
};

export const userRegister = async (body: {
  username: string;
  password: string;
  email: string;
}) => {
  if (!body) throw new Error("Email không đúng");
  const checkUser = await findByUserAndEmail(body);
  if (checkUser) {
    throw new Error("Tên người dùng hoặc email đã tồn tại!");
  }
  const password = await bcrypt.hash(body.password, 10);

  const newUser = await createUser({
    ...body,
    password,
    status: "active",
  });
  if (!newUser) {
    throw new Error("Không thể đăng ký");
  }
  return newUser;
};

// Yêu cầu quên mật khẩu
export const forgotPasswordService = async (email: string) => {
  if (!email) throw new Error("Email không tồn tại");
  const user = await findByEmail(email);
  if (!user) {
    throw new Error("Email không đúng");
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: "1h",
  });
  const resetLink = `http://localhost:3001/auth/forgot-password/${token}`;
  const mailOptions = {
    from: "admin@duocnv.top",
    to: user.email,
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
      return info;
    });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    throw new Error("Đã xảy ra lỗi khi gửi email");
  }
  return { message: "Đã gửi email đặt lại mật khẩu" };
};

// Đặt lại mật khẩu
export const resetPasswordService = async (token: string, password: string) => {
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await changeUserPass(decoded.userId, hashedPassword);
    if (!user) {
      throw new Error("Không tìm thấy User");
    }
    return {
      message: "Đã thay đổi thành công",
    };
  } catch (error) {
    throw new Error("Lỗi không thể thay đổi mật khẩu");
  }
};

// Tạo Refresh Token
export const createRefreshToken = (user: any) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    REFRESH_TOKEN_SECRET as string,
    { expiresIn: "7d" } // Thời gian sống của Refresh Token (7 ngày)
  );
};

// Refresh Token: Tạo lại Access Token từ Refresh Token
export const refreshAccessToken = async (refreshToken: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET as string,
      (err, decoded: any) => {
        if (err) {
          return reject(err); // Token không hợp lệ
        }

        // Kiểm tra dữ liệu decoded
        if (!decoded.id || !decoded.username) {
          return reject(new Error("Invalid token payload"));
        }

        const accessToken = jwt.sign(
          { id: decoded.id, username: decoded.username },
          ACCESS_TOKEN_SECRET as string,
          { expiresIn: "1h" }
        );
        resolve(accessToken);
      }
    );
  });
};

// Tạo Access Token
export const createAccessToken = (user: any) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    ACCESS_TOKEN_SECRET as string,
    { expiresIn: "1h" }
  );
};

export const changePasswordUser = async (
  userId: number,
  oldPassword: string,
  newPassword: string
) => {
  try {
    const user = await findUserById(userId);

    if (!user) {
      throw new Error("Không tìm thấy user.");
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
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

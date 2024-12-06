import { z } from "zod";

const usernameSchema = z
  .string()
  .min(6, { message: "Username phải chứa ít nhất 6 ký tự" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username chỉ chứa chữ, số và dấu gạch dưới",
  });

const passwordSchema = z
  .string()
  .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
  .regex(/[a-z]/, { message: "Mật khẩu phải chứa ít nhất một chữ cái" })
  .regex(/[0-9]/, { message: "Mật khẩu phải chứa ít nhất một số" })
  .regex(/[\W_]/, {
    message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt",
  });
const emailSchema = z.string().email({ message: "Email không hợp lệ" });

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema,
});

export const forgotSchema = z.object({
  email: emailSchema,
});

export const resetSchema = z.object({
  password: passwordSchema,
});

export const changePasswordSchema = z.object({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
});

// src/modules/auth/library/auth.validator.ts
import { z } from 'zod'

// Xác định schema validation với Zod
export const loginSchema = z.object({
  username: z.string().min(4, 'Username phải có ít nhất 6 ký tự'),
  password: z
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
})

loginSchema.parse({ username: "Ludwig", password: "121212" });

// Định nghĩa kiểu dữ liệu dựa trên schema
export type LoginSchema = z.infer<typeof loginSchema>

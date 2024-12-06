// src/middleware/validateZod.ts
import { ZodError } from "zod";
import express from "express";

export const validate =
  (schema: any) =>
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    try {
      schema.parse(req.body);
      next(); // Dữ liệu hợp lệ, chuyển request cho controller tiếp theo
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        }));

        res.status(400).json({
          status: "Lỗi xác thực dữ liệu",
          errors,
        });

        return; // Đảm bảo không tiếp tục middleware tiếp theo
      }
      next(error);
    }
  };

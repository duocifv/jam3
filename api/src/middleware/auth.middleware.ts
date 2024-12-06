import jwt, { JwtPayload } from "jsonwebtoken";
import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string; // Định nghĩa thêm `user` để chứa dữ liệu từ token
}

const auth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Lấy token từ header Authorization

  if (!token) {
    return next(createError(403, "Không có quyền truy cập"));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "", (err, decoded) => {
    if (err) {
      return next(createError(401, "Token không hợp lệ hoặc hết hạn"));
    }
    req.user = decoded; // Gán thông tin giải mã từ token vào `req.user`
    next(); // Gọi middleware tiếp theo
  });
};

export default auth;

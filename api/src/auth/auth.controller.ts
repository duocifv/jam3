import { Request, Response, NextFunction } from "express";
import {
  userLogin,
  createAccessToken,
  createRefreshToken,
  refreshAccessToken,
  userRegister,
  changePasswordUser,
  resetPasswordService,
  forgotPasswordService,
} from "./auth.service";
import { cookieConfig } from "../config";
import message from "http-errors";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user = await userLogin(username, password);
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    res.cookie("refreshToken", refreshToken, cookieConfig);
    res.json({
      message: "Đăng nhập thành công",
      accessToken,
    });
  } catch (error) {
    next(message(400, error));
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, email, password } = req.body;
  try {
    const result = await userRegister({ username, password, email });
    res.json({ message: "Đăng ký thành công", result });
  } catch (error: any) {
    next(message(400, error.message || "Đã có lỗi xảy ra"));
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return next(message(401, "Không có refresh token"));
  }

  try {
    const accessToken = await refreshAccessToken(refreshToken);
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const profile = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    return next(message(401, "Không tìm thấy người dùng"));
  }

  res.json({
    message: "Thông tin người dùng",
    user: {
      id: req.user.id,
      username: req.user.username,
    },
  });
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  try {
    const result = await forgotPasswordService(email);
    res.status(200).json(result);
  } catch (error: any) {
    next(message(400, error.message));
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const result: any = await resetPasswordService(token, password);
    res.status(200).json({ message: result?.message });
  } catch (error: any) {
    next(message(400, error.message));
  }
};

export const changePassword = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { oldPassword, newPassword } = req.body;
  const userId = Number(req.user?.id);

  if (!userId) {
    return next(message(401, "Người dùng không hợp lệ"));
  }

  try {
    const result = await changePasswordUser(
      userId,
      oldPassword,
      newPassword
    );
    res.status(200).json({ message: result.message });
  } catch (error: any) {
    next(message(400, error.message));
  }
};

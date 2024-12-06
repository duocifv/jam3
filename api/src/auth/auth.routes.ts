import express from "express";
import {
  login,
  profile,
  register,
  forgotPassword,
  resetPassword,
  changePassword,
  refreshToken,
} from "./auth.controller";
import auth from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  changePasswordSchema,
  forgotSchema,
  loginSchema,
  registerSchema,
  resetSchema,
} from "./auth.validate";

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/refresh", refreshToken);
router.get("/profile", auth, profile);
router.post("/register", validate(registerSchema), register);
router.post("/forgot-password", validate(forgotSchema), forgotPassword);
router.post("/reset-password/:token", validate(resetSchema), resetPassword);
router.post(
  "/change-password",
  auth,
  validate(changePasswordSchema),
  changePassword
);

export default router;

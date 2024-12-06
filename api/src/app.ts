import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouters from "./auth/auth.routes";
import sequelize from './config';

dotenv.config();

const app = express();

// Log requests
app.use(morgan("dev"));

// Parse JSON
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Handle CORS with cache and preflight handling
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    maxAge: 86400,
  })
);

// Handle preflight OPTIONS requests
app.options("*", (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "https://duocnv.top");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

// Use security middleware
app.use(helmet());

app.use("/auth", authRouters);

// Sync database
sequelize.sync()
  .then(() => console.log('Database connected successfully'))
  .catch((err: Error) => console.error('Database connection error:', err));

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    message: err.message || "Đã có lỗi xảy ra",
    status: err.status || 500,
  });
});

export default app;

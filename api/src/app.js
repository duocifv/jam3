const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const postRouters = require("./post/post.routes.js");
const authRouters = require("./auth/auth.routes.js");
const session = require("../config/session.config");

const app = express();

// Log requests
app.use(morgan("dev"));

// Parse JSON
app.use(express.json());

// Handle CORS with cache and direct preflight handling
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    maxAge: 86400, // Cache preflight requests for 24 hours
  })
);
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});
// Security headers
app.use(helmet());

// Session handling
app.use(session);

// Define routes
app.use("/posts", postRouters);
app.use("/auth", authRouters);

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Đã có lỗi xảy ra",
    status: err.status || 500,
  });
});

module.exports = app;

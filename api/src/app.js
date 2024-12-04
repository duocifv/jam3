require('dotenv').config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const postRouters = require("./post/post.routes.js");
const authRouters = require("./auth/auth.routes.js");
const sequelize = require('./config.js');
const cookieParser = require('cookie-parser');

const app = express();

// Log requests
app.use(morgan("dev"));

// Parse JSON
app.use(express.json());

app.use(cookieParser());

// Handle CORS with cache and direct preflight handling
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    maxAge: 86400, 
  })
);

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://duocnv.top");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});


//Security headers
app.use(helmet());

// Define routes
app.use("/posts", postRouters);
app.use("/auth", authRouters);

// Khởi tạo cơ sở dữ liệu
sequelize.sync()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Error connecting to the database:', err));

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Đã có lỗi xảy ra",
    status: err.status || 500,
  });
});

module.exports = app;
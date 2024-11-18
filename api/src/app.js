const express = require("express");
const cors = require("cors");
const postRouters = require("./post/post.routes.js");
const authRouters = require("./auth/auth.routes.js");
const session = require('../config/session.config');

const app = express();

app.use(express.json());
app.use(session);
app.use(cors());
app.use("/services", postRouters);
app.use("/services", authRouters);
// app.use(express.json({ limit: '30mb' }));
// app.use(express.urlencoded({ limit: '30mb', extended: true }));

module.exports = app;

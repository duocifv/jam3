const express = require('express');
const cors = require('cors');
const postRouters = require('./post/post.routes.js');

const app = express();

app.use(express.json());

// app.use(express.json({ limit: '30mb' }));
// app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use("/services", postRouters);
app.use(cors());

module.exports = app;

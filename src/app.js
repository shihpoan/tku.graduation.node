"use strict";
const express = require("express");
const path = require("path");
const helmet = require("helmet");

const cors = require("cors");
const morgan = require("morgan");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// api Router
const api = require("./routes/api");
const lineRouter = require("./routes/line");
require("dotenv").config();

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// line sdk 必須在 body parser 前
app.use("/line", lineRouter);

app.use(helmet());
const corsOptions = {
  origin: [
    // `${process.env.ALLOWED_CORS_ORIGIN_LOCALHOST}`,
    `http://localhost:3000`,
    `https://tku.gu.zhshihpoan.com`,
  ],
  // origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use(bodyParser.json({ limit: "50mb" }));
// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
// combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "public")));
app.use("/api", api);

module.exports = app;

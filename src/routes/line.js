const express = require("express");
const LineRouter = require("./lines/line.router.js");

const line = express.Router();

line.use("/", LineRouter);

module.exports = line;

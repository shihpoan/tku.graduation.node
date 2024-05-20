const express = require("express");
const TestRouter = require("./test/test.router.js");

const api = express.Router();

api.use("/test", TestRouter);

module.exports = api;

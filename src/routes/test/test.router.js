const express = require("express");

const { httpBase } = require("./test.controller.js");

const TestRouter = express.Router();
TestRouter.get("/", httpBase);

module.exports = TestRouter;

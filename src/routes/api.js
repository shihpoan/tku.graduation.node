const express = require("express");
const TestRouter = require("./test/test.router.js");
const UserRouter = require("./users/user.router.js");
const BlessingRouter = require("./blessings/blessing.router.js");

const api = express.Router();

api.use("/test", TestRouter);
api.use("/users", UserRouter);
api.use("/blessings", BlessingRouter);

module.exports = api;

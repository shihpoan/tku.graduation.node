const express = require("express");

const {
  httpFindUser,
  httpFindOneUser,
  httpCreateUser,
} = require("./user.controller.js");

const UserRouter = express.Router();
UserRouter.get("/", httpFindUser);
UserRouter.post("/findOne", httpFindOneUser);
UserRouter.post("/bind", httpCreateUser);

module.exports = UserRouter;

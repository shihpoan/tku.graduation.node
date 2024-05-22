const express = require("express");

const {
  httpFindOneBlessingCategory,
  httpCreateBlessing,
  httpFindBlessingByReceiverId,
} = require("./blessing.controller.js");

const BlessingRouter = express.Router();
BlessingRouter.post("/findOne", httpFindOneBlessingCategory);
BlessingRouter.post("/findByReceiverId", httpFindBlessingByReceiverId);
BlessingRouter.post("/new", httpCreateBlessing);

module.exports = BlessingRouter;

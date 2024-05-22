const express = require("express");

const { httpBase, handleEvent } = require("./line.controller.js");

const line = require("@line/bot-sdk");
// create LINE SDK config from env variables
const config = {
  channelSecret: process.env.CHANNEL_SECRET,
};

const LineRouter = express.Router();

LineRouter.get("/", httpBase);
LineRouter.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

module.exports = LineRouter;

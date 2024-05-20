const fs = require("fs");
const path = require("path");

const { findTest } = require("../../models/test/test.model");

require("dotenv").config();

async function httpBase(req, res) {
  const testDatas = await findTest();
  res.status(200).json({ data: testDatas });
}

module.exports = {
  httpBase,
};

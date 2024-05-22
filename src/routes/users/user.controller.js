const fs = require("fs");
const path = require("path");

const {
  findUser,
  findOneUser,
  createUser,
} = require("../../models/users/user.model");

require("dotenv").config();

async function httpFindUser(req, res) {
  const datas = await findUser();
  res.status(200).json({ data: datas });
}

async function httpFindOneUser(req, res) {
  const { lineId } = req.body;
  const datas = await findOneUser(lineId);
  res.status(200).json({ data: datas });
}

// 建立 user : 綁定 LineID StudentId Name
async function httpCreateUser(req, res) {
  try {
    const data = req.body;
    const datas = await createUser(data);
    res.status(200).json({ data: datas });
  } catch (error) {
    console.error("發生錯誤:", error);
    res.status(500).json({ error: "id重複" });
  }
}

module.exports = {
  httpFindUser,
  httpFindOneUser,
  httpCreateUser,
};

const {
  findOneBlessingCategory,
} = require("../../models/blessingCategories/blessingCategory.model.js");

const {
  createBlessing,
  findBlessingByReceiverId,
} = require("../../models/blessings/blessing.model.js");

require("dotenv").config();

// 查詢 祝福單一類別
async function httpFindOneBlessingCategory(req, res) {
  const { name } = req.body;
  const datas = await findOneBlessingCategory(name);
  res.status(200).json({ data: datas });
}

// 查詢 個人全部祝福
async function httpFindBlessingByReceiverId(req, res) {
  const { receiver } = req.body;
  const datas = await findBlessingByReceiverId(receiver);
  res.status(200).json({ data: datas });
}

// 建立祝福連結
async function httpCreateBlessing(req, res) {
  try {
    const data = req.body;
    const datas = await createBlessing(data);
    res.status(200).json({ data: datas });
  } catch (error) {
    console.error("發生錯誤:", error);
    res.status(500).json({ error: "???" });
  }
}

module.exports = {
  httpFindOneBlessingCategory,
  httpFindBlessingByReceiverId,
  httpCreateBlessing,
};

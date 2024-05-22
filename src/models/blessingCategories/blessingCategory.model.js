const BlessingCategory = require("./blessingCategory.mongo.js");

// 查詢使用者
async function findOneBlessingCategory(name) {
  try {
    const data = await BlessingCategory.findOne({ name: name });
    return data;
  } catch (err) {
    err.name += "-findUser";
    throw err;
  }
}

module.exports = {
  findOneBlessingCategory,
};

const Test = require("./test.mongo.js");

// 查詢使用者
async function findTest(account) {
  try {
    const data = await Test.find({});
    return data;
  } catch (err) {
    err.name += "-findUser";
    throw err;
  }
}

module.exports = {
  findTest,
};

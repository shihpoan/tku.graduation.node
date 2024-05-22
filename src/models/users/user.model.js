const User = require("./user.mongo.js");

// 查詢使用者
async function findUser() {
  try {
    const data = await User.find({});
    return data;
  } catch (err) {
    err.name += "-findUser";
    throw err;
  }
}

// 查詢單一使用者
async function findOneUser(lineId) {
  try {
    const data = await User.findOne({ lineId: lineId });
    return data;
  } catch (err) {
    err.name += "-findOneUser";
    throw err;
  }
}

// 新增使用者
async function createUser(data) {
  const { lineId, studentId, name } = data;
  try {
    const newUser = new User({
      lineId,
      studentId,
      name,
    });

    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    err.name += "-createUser";
    throw err;
  }
}

module.exports = {
  findUser,
  createUser,
  findOneUser,
};

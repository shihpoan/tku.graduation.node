const Blessing = require("./blessing.mongo.js");

// 查詢全部祝福
async function findBlessing() {
  try {
    const data = await Blessing.find({});
    return data;
  } catch (err) {
    err.name += "-findBlessing";
    throw err;
  }
}

// 查詢個人全部祝福
async function findBlessingByReceiverId(id) {
  try {
    const data = await Blessing.find({
      receiver: id,
    })
      .populate({
        path: "sender",
        select: ["name"],
      })

      .populate({
        path: "category",
        select: ["name", "description", "imageUrl"],
      });
    return data;
  } catch (err) {
    err.name += "-findBlessing";
    throw err;
  }
}

// 新增祝福
async function createBlessing(data) {
  const { sender, receiver, category } = data;
  try {
    const newBlessing = new Blessing({
      sender,
      receiver,
      category,
    });

    const savedBlessing = await newBlessing.save();

    // 查詢並 populate sender 和 category 字段
    const populatedBlessing = await Blessing.findById(savedBlessing._id)
      .populate({
        path: "sender",
        select: "name",
      })
      .populate({
        path: "receiver",
        select: ["name"],
      })
      .populate({
        path: "category",
        select: ["name", "description", "imageUrl"],
      });

    return populatedBlessing;
  } catch (err) {
    err.name += "-createUser";
    throw err;
  }
}

module.exports = {
  findBlessing,
  findBlessingByReceiverId,
  createBlessing,
};

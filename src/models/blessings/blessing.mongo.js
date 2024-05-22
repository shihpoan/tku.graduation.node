const mongoose = require("mongoose");

const BlessingSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlessingCategory",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Blessing = mongoose.model("Blessing", BlessingSchema);

module.exports = Blessing;

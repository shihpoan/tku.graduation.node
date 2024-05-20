const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    account: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    tier: {
      type: String,
      default: "admin",
      // admin, super_admin, referee
    },
    eventList: {
      type: Array,
      // events 的 ObjId
      default: [],
    },
    is_enable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", testSchema);

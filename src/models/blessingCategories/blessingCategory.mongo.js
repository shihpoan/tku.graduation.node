const mongoose = require("mongoose");

const BlessingCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

const BlessingCategory = mongoose.model(
  "BlessingCategory",
  BlessingCategorySchema
);

module.exports = BlessingCategory;

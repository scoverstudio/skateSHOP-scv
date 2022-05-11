const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String },
  producer: { type: String },
  category: { type: String },
  size: { type: String },
  color: { type: String },
  gender: { type: String },
  price: { type: Number },
});

module.exports = mongoose.model("Product", productSchema);

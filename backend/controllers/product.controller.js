const Product = require("../models/product.model");

exports.getAll = async (req, res) => {
  try {
    const result = await Product.find();
    if (!result) res.status(404).json({ product: "NOT FOUND" });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getByProducer = async (req, res) => {
  try {
    const result = await Product.find({ producer: req.params.producer });
    if (!result) res.status(404).json({ product: "NOT FOUND" });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getByID = async (req, res) => {
  try {
    const result = await Product.findById(req.params.id);
    if (!result) res.status(404).json({ product: "NOT FOUND" });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

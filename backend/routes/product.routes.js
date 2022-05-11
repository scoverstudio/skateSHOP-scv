const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

router.get("/products", productController.getAll);
router.get("/products/:id", productController.getByID);

module.exports = router;

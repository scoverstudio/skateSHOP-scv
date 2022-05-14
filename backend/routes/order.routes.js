const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");

router.get("/orders", orderController.getAll);
router.post("/orders", orderController.addOrder);

module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require("../middleware/check-auth");

const Order = require("../model/order");
const Product = require("../model/products");

const OrdersController = require("../controllers/orders");

router.get('/',checkAuth,OrdersController.orders_get_all);

router.post('/',checkAuth,OrdersController.create_order);

router.get("/:orderId",checkAuth,OrdersController.get_order_by_id);

router.delete("/:orderId",checkAuth,OrdersController.delete_order);

module.exports = router;
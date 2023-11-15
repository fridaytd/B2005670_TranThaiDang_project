const express = require("express")

const orderController = require("../controllers/order.controller")
const { verifyToken } = require("../middlewares/auth.middleware.js")

const orderRouter = express.Router()

orderRouter
    .get("/", verifyToken, orderController.getOrder)
    .get("/:orderId", verifyToken, orderController.getOrderDetail)
    .post("/", verifyToken, orderController.addOrder)

module.exports = orderRouter
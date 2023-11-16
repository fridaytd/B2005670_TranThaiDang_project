const express = require("express")

const orderController = require("../controllers/order.controller")
const { verifyToken } = require("../middlewares/auth.middleware.js")

const orderRouter = express.Router()

orderRouter
    .get("/all", verifyToken('staff'), orderController.getAllOrders)
    .get("/", verifyToken('user'), orderController.getOrder)
    .get("/:orderId", verifyToken('user'), orderController.getOrderDetail)
    .post("/", verifyToken('user'), orderController.addOrder)
    .put("/updateStatus", verifyToken('staff'), orderController.updateOrderStatus)

module.exports = orderRouter
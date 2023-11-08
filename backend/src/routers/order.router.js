const express = require("express")

const orderController = require("../controllers/order.controller")
const { verifyToken } = require("../middlewares/auth.middleware.js")

const orderRouter = express.Router()

orderRouter
    .post("/", verifyToken, orderController.addOrder)

module.exports = orderRouter
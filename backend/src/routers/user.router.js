const userController = require('../controllers/user.controller')
const express = require('express')
const { verifyToken } = require("../middlewares/auth.middleware")

const userRouter = express.Router()

userRouter
    .get("/address", verifyToken, userController.getUserAddress)
    .post("/address", verifyToken, userController.addUserAddress)

module.exports = userRouter
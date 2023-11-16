const userController = require('../controllers/user.controller')
const express = require('express')
const { verifyToken } = require("../middlewares/auth.middleware")

const userRouter = express.Router()

userRouter
    .get("/address", verifyToken('user'), userController.getUserAddress)
    .post("/address", verifyToken('user'), userController.addUserAddress)
    .get("/:userId", verifyToken('user'), userController.getUserById)

module.exports = userRouter
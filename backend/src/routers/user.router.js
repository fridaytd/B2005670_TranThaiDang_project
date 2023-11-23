const userController = require('../controllers/user.controller')
const express = require('express')
const { verifyToken } = require("../middlewares/auth.middleware")

const userRouter = express.Router()

userRouter
    .get("/address", verifyToken('user'), userController.getUserAddress)
    .post("/address", verifyToken('user'), userController.addUserAddress)
    .put("/address", verifyToken("user"), userController.removeUserAddress)
    .get("/:userId", verifyToken('user'), userController.getUserById)
    .put("/infor", verifyToken("user"), userController.updateUserInfor)
    .put("/password", verifyToken('user'), userController.changePassword)

module.exports = userRouter
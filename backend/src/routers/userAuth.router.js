const express = require('express')

const userAuthController = require('../controllers/userAuth.controller')
const { verifyToken } = require('../middlewares/auth.middleware')

const userAuthRouter = express.Router()

userAuthRouter
    .post('/login', userAuthController.login)
    .post('/register', userAuthController.register)
    .post('/refresh', userAuthController.refreshToken)
    .post('/logout', verifyToken, userAuthController.logout)

module.exports = userAuthRouter
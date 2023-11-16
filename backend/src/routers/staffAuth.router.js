const express = require('express')

const staffAuthController = require('../controllers/staffAuth.controller')
const { verifyToken } = require('../middlewares/auth.middleware')

const staffAuthRouter = express.Router()

staffAuthRouter
    .post('/login', staffAuthController.login)
    .post('/register', staffAuthController.register)
    .post('/refresh', staffAuthController.refreshToken)
    .post('/logout', verifyToken('staff'), staffAuthController.logout)

module.exports = staffAuthRouter
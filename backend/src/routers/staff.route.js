const express = require("express")

const staffController = require('../controllers/staff.controller')
const { verifyToken } = require('../middlewares/auth.middleware')

const staffRouter = express.Router()

staffRouter
    .get('/', verifyToken('staff'), staffController.getStaffById)


module.exports = staffRouter
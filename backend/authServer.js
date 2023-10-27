require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const userAuthRouter = require('./src/routers/userAuth.router')
const staffAuthRouter = require('./src/routers/staffAuth.router')

const app = express()

app.use(cors())
app.use(morgan("combined"))
app.use(express.json())

app.use('/user/', userAuthRouter)
app.use('/staff/', staffAuthRouter)

async function startAuthServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connect database successfully");
    } catch (err) {
        console.error(err);
        process.exit()
    }

    app.listen(process.env.AUTH_PORT, () => {
        console.log(`Auth server is listening at port: ${process.env.AUTH_PORT} `);
    })
}

startAuthServer()
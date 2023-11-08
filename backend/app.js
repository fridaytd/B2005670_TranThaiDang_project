const path = require("path")
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const { verifyToken } = require('./src/middlewares/auth.middleware')

const productRouter = require("./src/routers/product.router")
const userRouter = require("./src/routers/user.router")
const orderRouter = require("./src/routers/order.router")


const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan("combined"))

app.use("/public", express.static(path.join(__dirname, 'public')))

app.use("/products", productRouter)
app.use("/user", userRouter)
app.use("/orders", orderRouter)

// app.get('/', (req, res) => {
//     res.status(200).send('Hello world')
// })
app.get('/check', verifyToken, (req, res) => {
    res.send("Checked")
})


module.exports = app
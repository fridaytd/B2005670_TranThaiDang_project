const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const { verifyToken } = require('./src/middlewares/auth.middleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("combined"))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.status(200).send('Hello world')
})
app.get('/check', verifyToken, (req, res) => {
    res.send("Checked")
})

module.exports = app
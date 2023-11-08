const UserService = require('../services/user.service')
const userService = new UserService()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function login(req, res) {
    const error = {}
    const userInfor = req.body
    if (!userInfor.username) {
        error.username = "Missing username"
    }
    if (!userInfor.password) {
        error.password = "Missing password"
    }
    if (Object.keys(error).length > 0) {
        return res.status(401).json({
            error: error
        })
    }
    const user = await userService.findByUsername(userInfor.username)
    if (!user) {
        error.username = "Unknown username"
    } else {
        const valid = await bcrypt.compare(userInfor.password, user.password)
        if (!valid) {
            error.password = "Invalid password"
        }
    }
    if (Object.keys(error).length > 0) {
        return res.status(401).json({
            error: error
        })
    }

    const { accessToken, refreshToken } = generateToken({ id: user._id, username: user.username, role: "user" })
    await userService.updateRefreshToken(user._id, refreshToken)
    return res.status(200).json({
        id: user.id,
        username: user.username,
        role: "user",
        accessToken: accessToken,
        refreshToken: refreshToken
    })
}

async function refreshToken(req, res) {
    const refreshToken = req.body.refreshToken
    if (!refreshToken) {
        return res.sendStatus(401)
    }
    const user = await userService.findByRefreshToken(refreshToken)
    if (!user) {
        return res.sendStatus(403)
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const accessToken = jwt.sign({ id: user._id, username: user.username, role: "user" }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "5m"
        })
        return res.status(200).json({ accessToken })
    } catch (err) {
        return res.sendStatus(403)
    }
}

async function logout(req, res) {
    const userId = req.id
    await userService.updateRefreshToken(userId, null)
    return res.sendStatus(200)
}

async function register(req, res) {
    const error = {}
    const user = req.body

    // Validate username
    if (!user.username) {
        error.username = "Missing username"
    } else if (user.username.length < 5 || user.username.length > 20) {
        error.username = "The length of username must be between 5 and 20 characters"
    } else if (await userService.findByUsername(user.username)) {
        error.username = "Username existed"
    }

    // Validate fullname
    if (!user.fullname) {
        error.fullname = "Missing fullname"
    } else if (user.fullname.length < 5 || user.fullname.length > 30) {
        error.fullname = "The length of fullname must be between 5 and 20 characters"
    }

    // Validate password
    if (!user.password) {
        error.password = "Missing password"
    } else if (user.password.length < 8 || user.password.length > 30) {
        error.password = "The length of password must be between 8 and 30 characters"
    }
    // Validate password again
    if (!user.passwordagain) {
        error.passwordagain = "Missing password again"
    } else if (user.password != user.passwordagain) {
        error.passwordagain = "Password again and password must be the same"
    }

    // Validate phone
    if (!user.phone) {
        error.phone = "Missing phone nuber"
    } else if (user.phone.length != 10) {
        error.phone = "Invalid phone nummber"
    } else if (await userService.findByPhone(user.phone)) {
        error.phone = "Phone number existed"
    }

    if (Object.keys(error).length > 0) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }

    user.password = await bcrypt.hash(user.password, 10)
    try {
        return res.status(201).json(await userService.addUser(user))
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Cannot create user"
        })
    }
}

function generateToken(user) {
    const tokens = {
        accessToken: jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "5m"
        }),
        refreshToken: jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "2h"
        })
    }
    return tokens
}

module.exports = {
    login,
    refreshToken,
    logout,
    register,
}
const StaffService = require('../services/staff.service')
const staffService = new StaffService()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function login(req, res) {
    const error = {}
    const staffInfor = req.body
    if (!staffInfor.staffname) {
        error.staffname = "Missing staffname"
    }
    if (!staffInfor.password) {
        error.password = "Missing password"
    }
    if (Object.keys(error).length > 0) {
        return res.status(401).json({
            error: error
        })
    }
    const staff = await staffService.findByStaffname(staffInfor.staffname)
    if (!staff) {
        error.staffname = "Unknown staffname"
    } else {
        const valid = await bcrypt.compare(staffInfor.password, staff.password)
        if (!valid) {
            error.password = "Invalid password"
        }
    }
    if (Object.keys(error).length > 0) {
        return res.status(401).json({
            error: error
        })
    }

    const { accessToken, refreshToken } = generateToken({ id: staff._id, staffname: staff.staffname, role: "staff" })
    await staffService.updateRefreshToken(staff._id, refreshToken)
    return res.status(200).json({
        id: staff.id,
        staffname: staff.staffname,
        role: "staff",
        accessToken: accessToken,
        refreshToken: refreshToken
    })
}

async function refreshToken(req, res) {
    const refreshToken = req.body.refreshToken
    if (!refreshToken) {
        return res.sendStatus(401)
    }
    const staff = await staffService.findByRefreshToken(refreshToken)
    if (!staff) {
        return res.sendStatus(403)
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const accessToken = jwt.sign({ id: staff._id, staffname: staff.staffname, role: "staff" }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "5m"
        })
        return res.status(200).json({ accessToken })
    } catch (err) {
        return res.sendStatus(403)
    }
}

async function logout(req, res) {
    const staffId = req.id
    await staffService.updateRefreshToken(staffId, null)
    return res.sendStatus(200)
}

async function register(req, res) {
    const error = {}
    const staff = req.body

    // Validate staffname
    if (!staff.staffname) {
        error.staffname = "Missing staffname"
    } else if (staff.staffname.length < 5 || staff.staffname.length > 20) {
        error.staffname = "The length of staffname must be between 5 and 20 characters"
    } else if (await staffService.findByStaffname(staff.staffname)) {
        error.staffname = "Staffname existed"
    }

    // Validate fullname
    if (!staff.fullname) {
        error.fullname = "Missing fullname"
    } else if (staff.fullname.length < 5 || staff.fullname.length > 30) {
        error.fullname = "The length of fullname must be between 5 and 20 characters"
    }

    // Validate password
    if (!staff.password) {
        error.password = "Missing password"
    } else if (staff.password.length < 8 || staff.password.length > 30) {
        error.password = "The length of password must be between 8 and 30 characters"
    }

    // Validate phone
    if (!staff.phone) {
        error.phone = "Missing phone nuber"
    } else if (staff.phone.length != 10) {
        error.phone = "Invalid phone nummber"
    } else if (await staffService.findByPhone(staff.phone)) {
        error.phone = "Phone number existed"
    }

    if (Object.keys(error).length > 0) {
        return res.status(400).json({
            error: error
        })
    }

    staff.password = await bcrypt.hash(staff.password, 10)
    try {
        return res.status(201).json(await staffService.addStaff(staff))
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Cannot create staff"
        })
    }
}

function generateToken(staff) {
    const tokens = {
        accessToken: jwt.sign(staff, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "5m"
        }),
        refreshToken: jwt.sign(staff, process.env.REFRESH_TOKEN_SECRET, {
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
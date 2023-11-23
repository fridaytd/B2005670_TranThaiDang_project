const UserService = require("../services/user.service")
const bcrypt = require('bcrypt')

const userService = new UserService()

async function getUserAddress(req, res) {
    const userId = req.id
    try {
        const address = await userService.getUserAddress(userId)
        return res.status(200).json(address)
    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
}

async function addUserAddress(req, res) {
    const userId = req.id
    const address = req.body.address
    if (!address) {
        return res.status(400).json({
            error: "No address"
        })
    } else if (address.length < 10) {
        return res.status(400).json({
            error: "Length of address must be longer"
        })
    }
    try {
        const result = await userService.addUserAddress(userId, address)
        return res.status(201).json(result)
    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
}

async function removeUserAddress(req, res) {
    const userId = req.id
    const address = req.body.address
    try {
        const result = await userService.removeUserAddress(userId, address)
        return res.status(200).json(result)
    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
}

async function getUserById(req, res) {
    const userId = req.params.userId
    try {
        const result = await userService.findById(userId)

        res.status(200).json(result)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

async function updateUserInfor(req, res) {
    const userId = req.id
    const fullname = req.body.fullname
    const phone = req.body.phone
    const error = {}
    if (!fullname) {
        error.fullname = "Missing fullname"
    } else if (fullname.length < 5 || fullname.length > 30) {
        error.fullname = "The length of fullname must be between 5 and 20 characters"
    }

    if (!phone) {
        error.phone = "Missing phone nuber"
    } else if (phone.length != 10) {
        error.phone = "Invalid phone nummber"
    } else {
        const user = await userService.findByPhone(phone)
        if (user._id != userId) {
            error.phone = "Phone number existed"
        }
    }

    if (Object.keys(error).length > 0) {
        return res.status(400).json(error)
    }

    try {
        await userService.updateUserInfor(userId, fullname, phone)
        const result = await userService.findById(userId)
        return res.status(200).json(result)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
}

async function changePassword(req, res) {
    const userId = req.id
    const password = req.body.password
    const newPassword = req.body.newPassword
    const passwordConfirm = req.body.passwordConfirm
    const error = {}

    if (!password) {
        error.password = "Missing password"
    } else {
        const user = await userService.findById(userId)
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
            error.password = "Invalid password"
        }
    }

    if (!newPassword) {
        error.newPassword = "Missing new password"
    } else if (newPassword.length < 8 || newPassword.length > 30) {
        error.newPassword = "The length of new password must be between 8 and 30 characters"
    }
    // Validate password again
    if (!passwordConfirm) {
        error.passwordConfirm = "Missing password confirm"
    } else if (newPassword != passwordConfirm) {
        error.passwordConfirm = "Password confirm and password must be the same"
    }

    if (Object.keys(error).length > 0) {
        return res.status(400).json(error)
    }

    try {
        const hash = await bcrypt.hash(newPassword, 10)
        await userService.changePassword(userId, hash)
        return res.sendStatus(200)
    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
}

module.exports = {
    getUserAddress,
    addUserAddress,
    removeUserAddress,
    getUserById,
    updateUserInfor,
    changePassword,
}
const UserService = require("../services/user.service")

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

module.exports = {
    getUserAddress,
    addUserAddress,
    getUserById,
}
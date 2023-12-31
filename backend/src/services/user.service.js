
const UserModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId


class UserService {
    constructor() {
        this.db = UserModel
    }

    async addUser(user) {
        const addedUser = await this.db.create(user)
        return addedUser
    }

    async getAllUsers() {
        return await this.db.find({}, {
            __v: 0,
        })
    }

    async findById(id) {
        return await this.db.findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null })
    }

    async findByUsername(usernameIn) {
        return await this.db.findOne({ username: usernameIn })
    }

    async findByPhone(phoneNumber) {
        return await this.db.findOne({ phone: phoneNumber })
    }

    async findByRefreshToken(refreshToken) {
        return await this.db.findOne({
            refreshToken: refreshToken
        })
    }

    async updateRefreshToken(id, refreshToken) {
        return await this.db.findOneAndUpdate({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null }, {
            refreshToken: refreshToken
        })
    }

    async getUserAddress(id) {
        return (await this.db.findById(id)).address
    }

    async addUserAddress(id, address) {
        const allAddress = await this.getUserAddress(id)
        allAddress.push(address)
        await this.db.findOneAndUpdate({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null }, {
            address: allAddress,
        })
        return await this.getUserAddress(id)
    }

    async removeUserAddress(userId, address) {
        let allAddress = await this.getUserAddress(userId)
        allAddress = allAddress.filter((add) => add != address)
        await this.db.findOneAndUpdate({
            _id: ObjectId.isValid(userId) ? new ObjectId(userId) : ""
        }, {
            address: allAddress
        })
        return await this.getUserAddress(userId)
    }

    async updateUserInfor(userId, fullname, phone) {
        return await this.db.findByIdAndUpdate({
            _id: ObjectId.isValid(userId) ? new ObjectId(userId) : ''
        }, {
            fullname: fullname,
            phone: phone
        })
    }

    async changePassword(userId, newPassword) {
        return await this.db.findOneAndUpdate({
            _id: ObjectId.isValid(userId) ? new ObjectId(userId) : ""
        }, {
            password: newPassword,
        })
    }
}

module.exports = UserService
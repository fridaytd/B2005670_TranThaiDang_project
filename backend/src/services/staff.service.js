
const StaffModel = require('../models/staff.model');
const ObjectId = require('mongoose').Types.ObjectId


class StaffService {
    constructor() {
        this.db = StaffModel
    }

    async addStaff(staff) {
        const addedStaff = await this.db.create(staff)
        return addedStaff
    }

    async getAll() {
        return await this.db.find({}, {
            __v: 0,
        })
    }

    async findById(id) {
        return await this.db.findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null })
    }

    async findByStaffname(staffnameIn) {
        return await this.db.findOne({ staffname: staffnameIn })
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
}

module.exports = StaffService
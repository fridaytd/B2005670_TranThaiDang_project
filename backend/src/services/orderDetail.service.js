const OrderDetailModel = require("../models/orderDetail.model")
const ObjectId = require("mongoose").Types.ObjectId

class OrderDetailService {
    constructor() {
        this.db = OrderDetailModel
    }

    async addManyOrderDetail(manyOrderDetail) {
        return await this.db.insertMany(manyOrderDetail)
    }
}

module.exports = OrderDetailService
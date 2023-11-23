const OrderModer = require("../models/order.model")
const ObjectId = require("mongoose").Types.ObjectId

class OrderService {
    constructor() {
        this.db = OrderModer
    }

    async addOrder(order) {
        return await this.db.create(order)
    }

    async getOrder(userId) {
        return await this.db.find({ userId: userId });
    }

    async getAllOrder() {
        return await this.db.find({})
    }

    async updateOrderStatus(orderId, status, staffId) {
        return await this.db.findOneAndUpdate({
            _id: ObjectId.isValid(orderId) ? new ObjectId(orderId) : "",
        }, {
            status: status,
            staffId: staffId,
            updateTime: Date.now()
        })
    }
}

module.exports = OrderService
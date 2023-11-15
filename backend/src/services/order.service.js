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
}

module.exports = OrderService
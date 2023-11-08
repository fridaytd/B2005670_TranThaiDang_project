const mongoose = require("mongoose")
const ObjectId = require("mongoose").Types.ObjectId

const orderSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    staffId: {
        type: String,
    },
    orderTime: {
        type: Date,
        require: true,
    },
    deliveryTime: {
        type: Date
    },
    address: {
        type: String,
        require: true,
    },
    note: {
        type: String,
    },
    status: {
        type: String,
        require: true,
        default: "processing"
    }
})

module.exports = mongoose.model("Order", orderSchema)
const mongoose = require("mongoose")

const orderDetailSchema = mongoose.Schema({
    orderId: {
        type: String,
        require: true,
    },
    productId: {
        type: String,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
})

module.exports = mongoose.model("OrderDetail", orderDetailSchema)
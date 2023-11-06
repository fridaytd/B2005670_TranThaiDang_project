const mongoose = require('mongoose')

const productsShema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    creator: {
        type: String,
        require: true,
    },
    image_url: {
        type: String,
    }
})

module.exports = mongoose.model("Products", productsShema)
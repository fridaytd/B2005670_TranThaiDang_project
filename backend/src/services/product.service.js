const ProductModel = require("../models/product.model")
const ObjectId = require('mongoose').Types.ObjectId

class ProductService {
    constructor() {
        this.db = ProductModel
    };

    async findById(productId) {
        return await this.db.findOne({ _id: ObjectId.isValid(productId) ? new ObjectId(productId) : "" })
    }

    async addProduct(product) {
        return await this.db.create(product)
    }

    async getAllProducts() {
        return await this.db.find({})
    }

    async deleteProduct(productId) {
        return await this.db.deleteOne({ _id: ObjectId.isValid(productId) ? new ObjectId(productId) : "" })
    }

    async updateProduct(productId, product) {
        await this.db.findOneAndUpdate({
            _id: ObjectId.isValid(productId) ? new ObjectId(productId) : ""
        }, {
            name: product.name,
            price: product.price,
            type: product.type,
            description: product.description,
            creator: product.creator,
        })
        return await this.findById(productId)
    }
}

module.exports = ProductService
const ProductImageModel = require("../models/productImage.model")

class ProductImageService {
    constructor() {
        this.db = ProductImageModel;
    }

    async saveImage(image) {
        return await this.db.create(image)
    }

    async findByProductId(productId) {
        return await this.db.findOne({ productId: productId });
    }

    async deleteByProductId(productId) {
        return await this.db.deleteOne({ productId: productId })
    }

    async update(productId, productImage) {
        await this.db.findOneAndUpdate({
            productId: productId,
        }, {
            url: productImage.url,
            path: productImage.path
        })
        return this.findByProductId(productId)
    }
}

module.exports = ProductImageService
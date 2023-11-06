const express = require("express")

const upload = require("../middlewares/multer.middleware")
const productController = require("../controllers/product.controller")
const { verifyToken } = require("../middlewares/auth.middleware")

const productRouter = express.Router()

productRouter
    .get("/", productController.getAllProducts)
    .get("/:productId", productController.getProduct)
    .use(verifyToken)
    .post("/", upload.single("image"), productController.addProduct)
    .delete("/:productId", productController.deleteProduct)
    .put("/:productId", upload.single("image"), productController.updateProduct)

module.exports = productRouter
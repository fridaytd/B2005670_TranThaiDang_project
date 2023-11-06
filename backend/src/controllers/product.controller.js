const ProductService = require("../services/product.service")
const ProductImageService = require("../services/productImage.service")
const StaffService = require("../services/staff.service")

const path = require("path")
const fs = require("fs")
const { log } = require("console")

const productService = new ProductService()
const productImageService = new ProductImageService()
const staffService = new StaffService()

async function addProduct(req, res) {
    const error = {}
    const product = Object.assign(req.body)
    // console.log(req.file);

    if (!product.name) {
        error.name = "Missing name"
    } else if ((product.name).length < 5 || (product.name).length > 30) {
        error.name = "The length of product name must be between 5 and 30"
    }
    if (!product.price) {
        error.price = "Missing price"
    } else if (isNaN(product.price) || isNaN(parseInt(product.price))) {
        error.price = "Price muse be number"
    }
    if (!product.type) {
        error.type = "Missing type"
    } else if (!['tea', 'coffee'].includes(req.body.type)) {
        error.type = "Type is tea or coffee"
    }

    if (!req.file) {
        error.image = "Missing image ficture"
    } else if (![".jpg", ".jpeg", ".png"].includes(path.extname(req.file.path))) {
        console.log(path.extname(req.file.path));
        error.file = "File must be an image"
    }

    if ((Object.keys(error)).length > 0) {
        return res.status(400).json(error)
    }

    product.creator = req.id


    try {
        const result = await productService.addProduct(product)
        const finalImg = {
            productId: result._id,
            path: path.join(__dirname, "../../", req.file.path),
            url: "http://localhost:3000/" + req.file.path
        }

        const imgResult = await productImageService.saveImage(finalImg)
        return res.status(201).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: {
                server: "Cannot add product"
            }
        })
    } finally {

    }
}

// async function getProductImage(req, res) {
//     const productId = req.params.productId
//     try {
//         const productImg = await productImageService.findByProductId(productId)

//         res.contentType('image/jpeg');
//         return res.send(Buffer.toString.toString(productImg.buffer))
//     } catch (err) {
//         console.log(err);
//         return res.send("err")
//     }
// }

async function getAllProducts(req, res) {
    try {
        const result = await productService.getAllProducts();
        const final = await Promise.all(result.map(async (product) => {
            const staff = await staffService.findById(product.creator)
            product.creator = staff.fullname;
            const productImage = await productImageService.findByProductId(product._id)
            product.image_url = productImage.url
            // console.log(product);
            return product;
        }))
        // console.log(final);
        return await res.status(200).json(final)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Can not get all products"
        })
    }
}

async function deleteProduct(req, res) {
    const productId = req.params.productId;
    try {
        await productService.deleteProduct(productId)
        const result = await productImageService.findByProductId(productId);
        fs.unlinkSync(result.path)
        await productImageService.deleteByProductId(productId)
        res.sendStatus(200)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

async function getProduct(req, res) {
    const productId = req.params.productId
    try {
        const result = await productService.findById(productId)
        const productImage = await productImageService.findByProductId(productId)
        result.image_url = productImage.url
        return res.status(200).json(result)
    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
}

async function updateProduct(req, res) {
    // console.log(req.body);
    const error = {}
    const productId = req.params.productId
    const product = Object.assign({
        name: req.body.name,
        price: req.body.price,
        type: req.body.type,
        description: req.body.description
    })
    // console.log(req.file);

    if (!product.name) {
        error.name = "Missing name"
    } else if ((product.name).length < 5 || (product.name).length > 30) {
        error.name = "The length of product name must be between 5 and 30"
    }
    if (!product.price) {
        error.price = "Missing price"
    } else if (isNaN(product.price) || isNaN(parseInt(product.price))) {
        error.price = "Price muse be number"
    }
    if (!product.type) {
        error.type = "Missing type"
    } else if (!['tea', 'coffee'].includes(req.body.type)) {
        error.type = "Type is tea or coffee"
    }

    if (!req.file) {
    } else if (![".jpg", ".jpeg", ".png"].includes(path.extname(req.file.path))) {
        console.log(path.extname(req.file.path));
        error.file = "File must be an image"
    }

    if ((Object.keys(error)).length > 0) {
        return res.status(400).json(error)
    }

    product.creator = req.id


    try {
        const result = await productService.updateProduct(productId, product)
        if (req.file) {
            console.log(req.file);
            const oldImage = await productImageService.findByProductId(productId)
            console.log(oldImage);
            const finalImg = {
                path: path.join(__dirname, "../../", req.file.path),
                url: "http://localhost:3000/" + req.file.path
            }

            const imgResult = await productImageService.update(productId, finalImg)
            fs.unlinkSync(oldImage.path)
        }

        return res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: {
                server: "Cannot add product"
            }
        })
    } finally {

    }
}


module.exports = {
    addProduct,
    getAllProducts,
    deleteProduct,
    getProduct,
    updateProduct,
}
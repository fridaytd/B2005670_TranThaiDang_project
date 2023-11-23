const OrderService = require("../services/order.service")
const orderService = new OrderService()

const OrderDetailService = require("../services/orderDetail.service")
const orderDetailService = new OrderDetailService()

const UserService = require('../services/user.service')
const userService = new UserService()

const StaffService = require('../services/staff.service')
const staffService = new StaffService()

const ProductService = require('../services/product.service')
const productService = new ProductService()

const ProductImageService = require('../services/productImage.service')
const productImageService = new ProductImageService()

async function addOrder(req, res) {
    const error = {}
    const userId = req.id
    const orderDetail = req.body.orderDetail
    const address = req.body.address
    const note = req.body.note

    if (!orderDetail) {
        error.orderDetail = "No detail"
    } else if (orderDetail.length < 1) {
        error.orderDetail = "No detail"
    }

    if (!address) {
        error.address = "Missing address"
    }

    if (Object.keys(error).length > 0) {
        return res.status(400).json({
            error: error
        })
    }
    const order = {
        userId: userId,
        orderTime: Date.now(),
        address: address,
        note: note,
    }

    try {
        const orderResult = await orderService.addOrder(order)
        const orderId = orderResult._id
        const detail = orderDetail.map((item) => ({
            orderId: orderId,
            productId: item.productId,
            quantity: item.quantity,
        }))
        const detailResult = await orderDetailService.addManyOrderDetail(detail)
        return res.status(201).json(orderResult)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

async function getOrder(req, res) {
    const userId = req.id
    try {
        const orderResult = await orderService.getOrder(userId)
        const final = await Promise.all(orderResult.map(async (order) => {
            let details = await orderDetailService.getManyOrderDetail(order._id);
            details = await Promise.all(details.map(async (detail) => {
                return {
                    ...detail._doc,
                    ...(await productService.findById(detail.productId))._doc,
                    image_url: (await productImageService.findByProductId(detail.productId)).url
                }
            }))
            return {
                ...order._doc,
                detail: details,
                staff: await order.staffId ? (await staffService.findById(order.staffId)).fullname : ''
            }
        }))
        res.status(200).json(final);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

async function getOrderDetail(req, res) {
    const orderId = req.params.orderId
    try {
        const orderDetailResult = await orderDetailService.getManyOrderDetail(orderId)
        res.status(200).json(orderDetailResult)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

async function getAllOrders(req, res) {
    try {
        const allOrderResult = await orderService.getAllOrder();
        const final = await Promise.all(allOrderResult.map(async (order) => {
            const details = await orderDetailService.getManyOrderDetail(order._id)
            order.detail = await Promise.all(details.map(async (detail) => {
                return {
                    ...detail._doc,
                    ...(await productService.findById(detail.productId))._doc,
                    image_url: (await productImageService.findByProductId(detail.productId)).url
                }
            }))
            const user = await userService.findById(order.userId)
            order.user = user.fullname
            order.phone = user.phone
            order.staff = await order.staffId ? (await staffService.findById(order.staffId)).fullname : ''
            return {
                ...order._doc,
                detail: order.detail,
                user: order.user,
                staff: order.staff,
                phone: order.phone
            };
        }))
        res.status(200).json(final)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

async function updateOrderStatus(req, res) {
    const orderId = req.body.orderId
    const followingStatus = req.body.status
    const staffId = req.id
    try {
        const result = await orderService.updateOrderStatus(orderId, followingStatus, staffId)
        res.status(200).json(result)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

module.exports = {
    addOrder,
    getOrder,
    getOrderDetail,
    getAllOrders,
    updateOrderStatus,
}
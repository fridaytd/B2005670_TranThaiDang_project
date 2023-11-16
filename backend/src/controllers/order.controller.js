const OrderService = require("../services/order.service")
const orderService = new OrderService()

const OrderDetailService = require("../services/orderDetail.service")
const orderDetailService = new OrderDetailService()

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
        res.status(200).json(orderResult);
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
        const allOrderResult = await orderService.getAllOrder()
        res.status(200).json(allOrderResult)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

async function updateOrderStatus(req, res) {
    const orderId = req.body.orderId
    const followingStatus = req.body.status
    try {
        const result = await orderService.updateOrderStatus(orderId, followingStatus)
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
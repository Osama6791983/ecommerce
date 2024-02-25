const Order = require("../Models/orderModel");
const Product = require("../Models/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler")

// create new Order

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice,
        shippingPrice, totalPrice } = req.body;
    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice,
        shippingPrice, totalPrice,
        paidAt: Date.now(),
        user: req.user.id
    })
    res.status(201).json({
        success: true,
        order
    })
})

//get single order

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
        return next(new ErrorHandler("Order not found with this id", 404));
    }
    res.status(200).json({
        success: true,
        order
    })
})

//get single order

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
        return next(new ErrorHandler("Order not found with this id", 404));
    }
    res.status(200).json({
        success: true,
        order
    })
})

//get All orders of logged in user

exports.getAllMyOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
})

//get All orders ---admin

exports.getAllOrdersAdmin = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find()
    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    })
    res.status(200).json({
        success: true,
        orders,
        totalAmount
    })
})

//update order status ---admin

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler("Order not found with this id", 404))
    }
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this Product",400))
    }
    order.orderItems.forEach(async (order) => {
        await updateStock(order.product, order.quantity)
    });
    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now()
    }
    await order.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
        order,

    })
})

//updatestock function
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false })
}
//delete order  ---admin

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler("Order not found with this id", 404))
    }
    await order.deleteOne()

    res.status(200).json({
        success: true
    })
})
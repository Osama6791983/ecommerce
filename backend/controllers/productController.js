const ApiFeatures = require("../utils/apiFeatuers")
const Product = require("../Models/productModel")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

const ErrorHandler = require("../utils/errorHandler")
//create product --Admin
exports.createProduct = catchAsyncErrors(async (req, res,next) => {
    req.body.user = req.user.id
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})

//get all product
exports.getAllProducts = catchAsyncErrors(
    async (req, res, next) => {
        let resultPerpage = 6;
        const productsCount = await Product.countDocuments()
        const features = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerpage)
        const products = await features.query
        res.status(200).json({ success: true, products, productsCount,resultPerpage })

    }
)

//update product 

exports.updateProduct = catchAsyncErrors(
    async (req, res, next) => {
        
        let product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product not Found", 404))
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false })
        res.status(200).json({
            message: "Product Updated Successfully",
            success: true,
            product

        })
    }
)

//delete product --admin 
exports.deleteProduct = catchAsyncErrors(
    async (req, res, next) => {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404))
        }

        await product.deleteOne()
        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        })
    }
)

//get single product details

exports.getProductDetails = catchAsyncErrors(
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404))
        }

        res.status(200).json({
            success: true,
            product
        })
    }
)
//create new review and update the review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find((rev) => {
        return rev.user.toString() === req.user.id.toString()
    })
    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user.id.toString()) {
                return (rev.rating = rating,
                    rev.comment = comment)
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }
    let avg = 0;
    product.ratings = product.reviews.forEach((rev) => {
        avg += rev.rating
    })
    product.ratings = avg / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true
    })
})

//get all reviews of a product

exports.getProductReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    res.status(200).json({
        success: true,
        review: product.reviews
    })
})

//delete review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

  
        const reviews = product.reviews.filter((rev) => {
            return (rev._id.toString() !== req.query.id)
        })
        
        let avg = 0;
    reviews.forEach((rev) => {
        avg = +rev.rating
    })
   
    if (product.reviews.length===0) {
        const ratings = 0
        const numOfReviews = reviews.length
        await Product.findByIdAndUpdate(req.query.productId, {
            reviews,
            ratings,
            numOfReviews
        },{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        res.status(200).json({
            success: true,
            review: product.reviews,
            message:"No Reviews"
        })
    }else{
        const ratings = avg/product.reviews.length
        const numOfReviews = reviews.length
        await Product.findByIdAndUpdate(req.query.productId, {
            reviews,
            ratings,
            numOfReviews
        },{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        res.status(200).json({
            success: true,
            review: product.reviews
        })
    }
})
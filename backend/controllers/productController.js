const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/features');

/*<--Create Product--Admin-->*/
exports.createProduct = catchAsyncError(async (req, res, next) => {

    req.body.user = req.user.id

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});

/*<--Get All Product-->*/
exports.getAllProducts = catchAsyncError(async (req, res) => {

    // limit result per page 
    const resultPerPage = 10;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;

    // const products = await Product.find()

    res.status(200).json({
        success: true,
        products,
        productCount
    })

});

/*<--Update Product--Admin-->*/
exports.updateProduct = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not listed', 500));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
});


/*<--Delete Product--Admin-->*/

exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not listed', 500));
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product removed",
        product
    })
});

/*<--Product Details-->*/

exports.productDetials = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not listed', 500));
    }

    res.status(200).json({
        success: true,
        product
    })

});


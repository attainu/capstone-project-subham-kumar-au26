const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");


exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler('Please login for accessing this resource'))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    next()
})

exports.admin = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`${req.user.role} not allowed to access this zone`, 403)
            );
        };

        next();
    };
};
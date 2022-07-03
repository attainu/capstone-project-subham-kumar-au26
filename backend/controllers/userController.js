const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto');




/*<--User Registration-->*/
exports.registerUser = catchAsyncError(async (req, res, next) => {

    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            publicId: "1234567Sample",
            url: "sample.jpeg"
        }
    });

    const token = user.getJWTToken();

    res.status(201).json({
        success: true,
        token
    });

})


/*<--Login-->*/

exports.loginUser = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;

    // Check for user have both email & pwd 
    if (!email || !password) {
        return next(new ErrorHandler('Please enter credentails', 400))
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler('Invalid user credentails', 401))
    }

    const isPasswordMatch = user.comparePassword(password);

    if (!isPasswordMatch) {
        return next(new ErrorHandler('Invalid user credentails', 401))
    }

    sendToken(user, 200, res);

})


/*<--Logout-->*/

exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "Logged Out"
    });
});


/*<--ForgetPassword-->*/

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not registered', 404))
    }

    // Gert reset password token 

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message = `please click on below button for password reset:- \n\n ${resetPasswordUrl}`

    try {

        await sendEmail({

            email: user.email,
            subject: `Ecommerce password Recovery`,
            message,

        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,

        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500))
    }
});


/*<--ResetPassword-->*/

exports.resetpassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await user.findOne({
        resetPasswordToken,
        resetpasswordExpire: {$gt: Date.now()}
    });

    if (!user) {
        return next(new ErrorHandler('Rest password token is invalid or has been expired', 404))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Rest password token is invalid or has been expired', 404))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel')



/*<--User Registration-->*/
exports.registerUser = catchAsyncError( async(req, res, next) => {

    const{name, email, password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            publicId:"1234567Sample",
            url:"sample.jpeg"
        }
    });

    const token = user.getJWTToken();

    res.status(201).json({
        success:true,
        token
    });

})


/*<--Login-->*/

exports.loginUser = catchAsyncError (async (req, res, next) => {

    const {email, password} = req.body;

    // Check for user have both email & pwd 
    if(!email || !password){
        return next(new ErrorHandler('Please enter credentails', 400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user) {
        return next(new ErrorHandler('Invalid user credentails',401))
    }

    const isPasswordMatch = user.comparePassword(password);

    if(!isPasswordMatch) {
        return next(new ErrorHandler('Invalid user credentails',401))
    }

    const token = user.getJWTToken();

    res.status(200).json({
        success:true,
        token
    });
    
})

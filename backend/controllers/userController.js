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

    res.status(201).json({
        success:true,
        user
    });

})



const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxlength: [30, "Name could not exceed 30 letter"],
        minlength: [3, "Name could not less then 3 word"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email-id"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "enter your password"],
        minlength: [8, "Password should be greater than 8 character"],
        select: false
    },
    avatar: {
        publicId: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

module.exports = mongoose.model('User', userSchema)
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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

/*<--password hashing-->*/

userSchema.pre ('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
})

/*<--jwt token-->*/

userSchema.methods.getJWTToken = function() {
    return jwt.sign({id:this.id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRE,
    })
}


/*<--compare password-->*/

userSchema.methods.comparePassword = async function(enteredPassword) { 
    return await bcrypt.compare(enteredPassword, this.password ); 
}



module.exports = mongoose.model('User', userSchema)
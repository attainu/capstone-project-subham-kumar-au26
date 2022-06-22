const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter product name"]
    },
    description: {
        type: String,
        required: [true, "please enter product description"]
    },
    price: {
        type: Number,
        required: [true, "please enter product price"],
        maxlength: [8, "Please enter valid price"]
    },
    category: {
        type: String,
        required: [true, "please pro valid category"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [{
        publicId: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    Stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
    createdDate: {
        type: Date,
        default: Date.now,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }
});

module.exports = mongoose.model("Product", productSchema);

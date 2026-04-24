const mongoose = require('mongoose');

const userschema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true,unique:true },
        password: { type: String, required: true },
        role: {
             type: String, 
             enum:["admin","student","instructor"],
             default:"student",
            },
        otp: String,
        otpExpire: Date,
        isVerified:{
            type:Boolean,
            default:false
        },   


    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userschema);
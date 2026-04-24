const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    },
});
//REGISTER
exports.registerUser = async (req,res)=>{
    try {
        const {name,email,password,role} = req.body;
        const olduser = await User.findOne({email});
        const hashedpassword = await bcrypt.hash(password,15);
        const otp = Math.floor(100000 + Math.random()* 900000).toString();

        if(olduser && olduser.isVerified) {
            return res.status(400).json({message:"user already exists"});
        }
        
        if(olduser && !olduser.isVerified) {
            olduser.name = name;
            olduser.password = hashedpassword;
            olduser.role = role;
            olduser.otp = otp;
            olduser.otpExpire = new Date(Date.now()+ 5*60*1000);
            await olduser.save();
        } else {
            await User.create({
                name,
                email,
                password:hashedpassword,
                role,
                otp,
                otpExpire: new Date(Date.now()+ 5*60*1000),
            });
        }

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject:"OTP VERIFICATION",
            text:`Your otp is ${otp}`,
        });
        res.status(200).json({message:"otp sent success"});

    } catch(err){
         res.status(400).json({message:"register fail"});
    }
};
//verify otp

exports.verifyOtp = async (req,res)=>{
    try {
        const {email,otp} = req.body;
        const user = await User.findOne({email});
       
        if(!user) {
            return res.status(400).json({message:"user already exists"});
        }
         if(user.otp !== otp) {
            return res.status(400).json({message:"user already exists"});
        }
        
        user.isVerified = true;
        user.otp = null;
        user.otpExpire = null;
        await user.save();
        res.status(200).json({message:"OTP IS VERIFIED"});

    } catch(err){
         res.status(400).json({message:"VERIFY fail"});
    }
};

//LOGIN
exports.loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message:"user already exists"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
         if(!isMatch) {
            return res.status(400).json({message:"user already exists"});
        }
        const token = jwt.sign(
            {
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            },
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );
        res.status(200).json({token})
    } catch(err){
         res.status(400).json({message:"register fail"});
    }
};

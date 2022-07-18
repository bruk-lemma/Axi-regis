const {promisify}=require("util");
const jwt=require('jsonwebtoken');
const User=require('../models/userModel');
const AppError=require('./../utils/appError');
const catchAsync=require("../utils/catchAsync");

const signToken=id=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
};

exports.signUp=async (req,res)=>{
    try{
        //const newUser=await user.create(req.body);
        const newUser=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            passwordconfirm:req.body.passwordconfirm,
            passwordChangedAt:req.body.passwordChangedAt
        });
const  token=signToken(newUser._id);    
        res.status(201).json({
        status:"success",
        message:"Signed Up successfully...!",
        token,
        data:{
            user:newUser
        }
        });
    }catch(err){
    res.status(400).json({
        status:"SignUp failed...!",
        message:`Error ${err}`
    });
    }
   
};

exports.login=async (req,res,next)=>{
    try{
    const {email,password}=req.body;

    //1, check if email and password exists
    if(!email ||!password){
        return next(new AppError("please provide email and password..!",400))
    }
   
    //2, check if user exists && password is correct
     const user=await User.findOne({email}).select("+password");
     //console.log(user);

     //const correct=await user.correctPassword(password,user.password);
     if(!user || !(await user.correctPassword(password,user.password))){
        return next(new AppError("incorrect email or password",400));
     }
    //3,  if everything is ok,send token to client
    const token=signToken(user._id);
    res.status(200).json({
        status:"Successfully loged in",
        token,
        user:user.name
    });
    }catch(err){
        res.status(404).json({
            status:"failed",
            message:`ERROR ${err}`
        })
    }
}; 

exports.protect=catchAsync(async(req,res,next)=>{
    //1 getting token and check if its there
let token;
if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    token=req.headers.authorization.split(' ')[1];
}
//console.log(token);
if(!token){
    return next(new AppError("you are not loged in please log in to ur account...!",401));
}

//2 verification of the token

const decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET);
//console.log(decoded);

//3 check if user still exists
const freshUser=await User.findById(decoded.id);
if(!freshUser){
    return next(new AppError("the user belonging to this token no longer exists.",401));
}

//4 check if user changed password after token was issued.

if(freshUser.changedPasswordAfter(decoded.iat)){
    return next(new AppError("User recently chnaged password please log in again..!",401));
}

//Grant Access to protected route..
req.user=freshUser;
next();
});
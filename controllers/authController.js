const {promisify}=require("util");
const jwt=require('jsonwebtoken');
const crypto=require('crypto');
const User=require('../models/userModel');
const AppError=require('./../utils/appError');
const catchAsync=require("../utils/catchAsync");
const sendEmail=require("../utils/email");


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
            passwordChangedAt:req.body.passwordChangedAt,
            role:req.body.role
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

//Grant Access to protected route...very important for the next step protecting certain routes from unautorized users.
req.user=freshUser;
next();
});

exports.restrictTo=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                new AppError("you dont have permission to perform thos action",403)
            );
        }
        next();
    }
};

exports.forgetPassword=async (req,res,next)=>{
//1) get user based on the posted email
const user=await User.findOne({email:req.body.email});
if(!user){
    return next(new AppError("There is no user with this email address",404));
}
  
//2) generate the random reset token 
                     
const resetoken=user.createPasswordResetToken();
user.save({validateBeforeSave:false});

//3) send it to user's email

const resetURL=`${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetoken}`;
const message=`Forgot your password? submit a patch request with your new password and passwordConfirm to: ${resetURL}.\n if you didn't forget your password, please ignore this email!!`;

try{
await sendEmail({
    email:user.email,
    subject:"Your password reset token (valid for 10 min)",
    message
});

res.status(200).json({
    status:"sucesss",
    message:"Token sent to email"
});
}catch(err){
    user.passwordResetToken=undefined;
    user.passwordresetExpires=undefined;
await user.save({validateBeforeSave:false});
    return next(new AppError("There was an error sending the email. Try again later!",500)); 
}
};

exports.resetpassword=catchAsync(async (req,res,next)=>{
//1) get user based on the token
const hashedToken=crypto.createHash('sha256').update(req.params.token).digest('hex');
const user=await User.findOne({
passwordResetToken:hashedToken,passwordResetExpires:{$gt:Date.now()}});
//2) if token has not expired, and there is user set the new password

if(!user){
    return next(new AppError("Token is invalid or has expires",400));
}
user.password=req.body.password;
user.passwordconfirm =req.body.passwordconfirm;
user.passwordResetToken=undefined;
user.passwordresetExpires=undefined;
await user.save();

//3) update changedpasswordAt property fro the user

//4) log the user in,send JWT

const token=signToken(user._id);
res.status(200).json({
status:"sucess",
token
});
});

exports.updatePassword=catchAsync(async (req,res,next)=>{
    //1) get user from collection
const user=await User.findById(req.user.id).select("+password");
 
    //2) check if POSTED current password is correct

if(!(await user.correctPassword(req.body.passwordcurrent,user.password))){
    return next(new AppError("Your current password is wrong",401))
}
    //3) if so, update password
user.password=req.body.password;
user.passwordconfirm=req.body.passwordconfirm;
await user.save();
    //4) log user in,send jwt 
 res.status(200).json({
    status:"success",
    
 });   


});
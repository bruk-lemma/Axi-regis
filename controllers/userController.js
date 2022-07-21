const User=require("../models/userModel");
const catchAsync=require("../utils/catchAsync");
const AppError=require("../utils/appError");


exports.updateMe=catchAsync(async(req,res,next)=>{
const filterObj=(obj,...allowedFields)=>{
    const newObj={};
    Object.keys(obj).forEach(el=>{
        if(allowedFields.includes(el)) newObj[el]=obj[el];
    });
    return newObj;
};

    //1) create error if user posts password data
      if(req.body.password || req.body.passwordconfirm){
        return next(new AppError("This route is not for password update.please use /updatemypassword",400));
      }

    //2) Update  user document

//filtered out unwanted fields that are not allowed to be updated
    const filteredBody=filterObj(req.body,'name','email');
    const updateUser=await User.findByIdAndUpdate(req.user.id,filteredBody,{
     name:true,
     runValidators:true
    });
    res.status(200).json({
        status:"success",
        data:{
            user:updateUser
        }
    });

});
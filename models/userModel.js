const mongoose=require('mongoose');
const validator=require("validator");
const bcrypt=require('bcryptjs');
const crypto=require("crypto");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide you name...!']
    },
    email:{
        type:String,
        required:[true,'please provide your email..!'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please provide a valid email']
    },
    role:{
     type:String,
     enum:["client","teacher","admin"],
     default:"client"
    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minlength:8
    },
    passwordconfirm:{
        type:String,
        required:[true,'Please confirm your password'],
        validate:{
            //this only works on create and save!!
            validator:function(el){
                return el === this.password;
            },
        message:"Password are not the same..."    
        }
    },
    passwordChangedAt:{type:Date},
    passwordResetToken:{type:String},
    passwordResetExpires:{type:Date}
 
});

userSchema.pre('save',async function(next){
    //only run this function if password was actually modified
    if(!this.isModified('password')) return next();
    //hash the password with cost of 12;
    this.password=await bcrypt.hash(this.password,12);
    //delete the password confirm field
    this.passwordconfirm=undefined;
    next();
});

userSchema.methods.correctPassword=async function(candidate_password,user_password){
    return await bcrypt.compare(candidate_password,user_password);
};

userSchema.methods.changedPasswordAfter=function(JWTTIimestamp){
    if(this.passwordChangedAt){
        const chnagedTimeStamp=parseInt(this.passwordChangedAt.getTime()/1000,10);
        console.log(this.passwordChangedAt,JWTTIimestamp);
        return JWTTIimestamp < chnagedTimeStamp;
    }
    return false;
};

userSchema.methods.createPasswordResetToken=function(){
    const resetToken=crypto.randomBytes(32).toString("hex");
    this.passwordResetToken=crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

console.log(resetToken,this.passwordResetToken);

this.passwordResetExpires=Date.now()+ 10 * 60 * 1000; 
//console.log(resetToken);
return resetToken; 
};

const User=mongoose.model('User',userSchema);
module.exports=User;
const mongoose=require('mongoose');
const { locals } = require('../app');
const teacherSchema=new mongoose.Schema({
    first_name:{
      type:String,
      required:[true,"A teacher must have a first-name"],
      unique: true,
      trim:true
    },
    last_name:{
      type:String,
      required:[true,"A teacher  must have a last-name"],
      trim:true
    },
    email:{
        type:String,
        required:[true,"A tecaher must have an email"],
        unique:true,
        trim:true
    },
    address:{
      type:String,
      required:[true,"A teacher  must have a address"],
      trim:true

    },
    phone_number:{
      type:String,
      required:[true,"A teacher  must have a phone number"],
      trim:true
    },
    teacher_education_level:{
      type:String,
      required:[true,"A teacher  must have a education level"],
      trim:true
    },
    teacher_tutor_subjects:{
      type:String,
      required:[true,"A teacher  must have a tutor subjects"],
      trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    } 
  },{toJSON:{virtuals:true},toObject:{virtuals:true}});
  clientSchema.virtual('duration').get(function(){
  return this.address;
});  
const Teacher=mongoose.model('Teacher',teacherSchema);
module.exports=Teacher;
const mongoose=require('mongoose');
const { locals } = require('../app');
const clientSchema=new mongoose.Schema({
    first_name:{
      type:String,
      required:[true,"A client must have a first-name"],
      unique: true,
      trim:true
    },
    last_name:{
      type:String,
      required:[true,"A client must have a last-name"],
      trim:true
    },
    address:{
      type:String,
      required:[true,"A client must have a address"],
      trim:true

    },
    phone_number:{
      type:String,
      required:[true,"A client must have a phone number"],
      trim:true
    },
    child_grade:{
      type:String,
      required:[true,"A client must have a child grade"],
      trim:true
    },
    child_gender:{
      type:String,
      required:[true,"A client must have a child gender"],
      trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    } 
  });
const Client=mongoose.model('Client',clientSchema);
module.exports=Client;
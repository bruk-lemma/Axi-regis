const mongoose=require('mongoose');
const clientSchema=new mongoose.Schema({
    first_name:{
      type:String,
      required:[true,"A client must have a first-name"],
      unique: true
    },
    last_name:{
      type:String,
      required:[true,"A client must have a last-name"]
    },
    address:{
      type:String,
      required:[true,"A client must have a address"]
    },
    phone_number:{
      type:String,
      required:[true,"A client must have a phone number"]
    },
    child_grade:{
      type:String,
      required:[true,"A client must have a child grade"]
    },
    child_gender:{
      type:String,
      required:[true,"A client must have a child gender"]
    },
  });
const Client=mongoose.model('Client',clientSchema);
module.exports=Client;
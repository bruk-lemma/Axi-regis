const Client = require('../models/clientModel');
const APIFeatures=require('../utils/apiFeatures');
exports.getAllClients = async(req, res) => {
 // console.log(req.requestTime);
 try{
const features=new APIFeatures(Client.find(),req.query).filter().sort().limitFields().pagination();

  const Clients=await features.query;
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: `Clients: ${Clients.length}`,
    data: {
     Clients
    }
  });
}catch (err){
  res.status(400).json({
    status:'fail',
    message: `Error ${err}`
  });
  console.log(err);
}
};

exports.getClient = async(req, res) => {
  console.log(req.params);
  try{
  //const id = req.params.id * 1;

  const client = await Client.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      client
    }
  });
}catch (err){
  res.status(400).json({
    stats:"fail",
    message:err
  });
}
  
};

exports.createClient = async (req, res) => {
  // console.log(req.body);
  console.log(req.body);

try{
  const newClient= await Client.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      Client: newClient
    }
  });
}catch (err) {
  res.status(400).json({
    status: 'fail',
    message:`error is ${err}`
  });
}
      
}
  

exports.updateClient = async (req, res) => {
 try{
  const Updated_Client=await Client.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
  res.status(200).json({
    status: 'success',
    data: {
      Client:  Updated_Client
    }
  });
 }catch (err){
  res.status(400).json({
    status: 'fail',
    message:`error is ${err}`
  });
 }
};

exports.deleteClient = async(req, res) => {
  try{
    const Deleted_Client=await Client.findByIdAndDelete(req.params.id);
  res.status(204).json({
    messahge: "Client Deleted",
    data: null
  });
}catch (err){
  res.status(400).json({
    message: err
  });
}
};

exports.getClientStats=async(req,res)=>{
  try{
    const stat= await Client.aggregate([
      {
        $match:{child_grade:{$eq:"middleschool"}}
      },
      {
        $group:{
          _id:"address",
          address:{$first:'gerji'}
        }
      }
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        Client: stat
      }
    });
  }catch (err){
    res.status(404).json({
      status:'fail',
      message:err.message
    })
  }
};

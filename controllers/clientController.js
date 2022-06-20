const Client = require('../models/clientModel');
exports.getAllClients = async(req, res) => {
 // console.log(req.requestTime);
 try{
  const queryObj={...req.query};
  const excludeFields=['page','sort','limit','fields'];
  excludeFields.forEach(el => delete queryObj[el]);

  ///let query=Client.find(JSON.parse(quer)) 
//sorting
  let query=Client.find(queryObj);
  if(req.query.sort){
    const sortBy=req.query.sort.split(",").join(" ");
    query=query.sort(sortBy)
  }else{
    query=query.sort('-createdAt');
  }

  //Limiting fields
if(req.query.fields){
  const fields=req.query.fields.split(',').join(' ');
  query=query.select(fields);
}else{
  query=query.select('-__v');
}

//pagination
const page=req.query.page * 1 || 1;
const limit=req.query.limit *1 || 100;
const skip=(page - 1)*limit;

query=query.skip(skip).limit(limit);

if(req.query.page){
  const numClients=await Client.countDocuments();
  if(skip >= numClients) throw new Error("This page does not exist");
}

  const Clients=await query;
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

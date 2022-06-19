const Client = require('../models/clientModel');
//const Client=require('../models/clientModel');
exports.getAllClients = async(req, res) => {
 // console.log(req.requestTime);
 try{
 const Clients=await Client.find();
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
    status:fail,
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
  

exports.updateClient = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};

exports.deleteClient = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};

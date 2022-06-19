const Client=require('../models/clientModel');
exports.getAllClients = (req, res) => {
 // console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
   // results: tours.length,
    //data: {
     // tours
   // }
  });
};

exports.getClient = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  /*const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
  */
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

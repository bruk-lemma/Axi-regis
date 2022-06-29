const express = require('express');
const clientController = require('../controllers/clientController');

const router = express.Router();

//router.param('id', clientController.checkID);

router
  .route('/')
  .get(clientController.getAllClients)
  .post(clientController.createClient);
  
router.route('/client-stat').get(clientController.getClientStats);

router
  .route('/:id')
  .get(clientController.getClient)
  .patch(clientController.updateClient)
  .delete(clientController.deleteClient);

module.exports = router;

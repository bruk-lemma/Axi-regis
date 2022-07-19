const express = require('express');
const clientController = require('../controllers/clientController');
const authController = require('../controllers/authController');

const router = express.Router();

//router.param('id', clientController.checkID);

router
  .route('/')
  .get(authController.protect,clientController.getAllClients)
  .post(clientController.createClient);
  


router.route('/client-stat').get(clientController.getClientStats);
router
  .route('/:id')
  .get(clientController.getClient)
  .patch(clientController.updateClient)
  .delete(authController.protect,authController.restrictTo("admin"),clientController.deleteClient);

module.exports = router;

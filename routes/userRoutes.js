const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();


router
  .route('/signup')
  .post(authController.signUp);
router
  .route('/login')
  .post(authController.login);

router
.route("/forgetpassword")
.post(authController.forgetPassword);
router
.route("/resetpassword/:token")
.post(authController.resetpassword);  
 
module.exports = router;

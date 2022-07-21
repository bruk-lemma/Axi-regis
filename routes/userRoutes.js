const express = require('express');
const authController = require('../controllers/authController');
const userController=require('../controllers/userController');
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
.patch(authController.resetpassword);  
router
.route("/updatemypassword")
.patch(authController.protect,authController.updatePassword);  
router
.route("/updateme")
.patch(authController.protect,userController.updateMe);
module.exports = router;

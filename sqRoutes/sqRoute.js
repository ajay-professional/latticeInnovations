const express = require('express');
const signupController=require('../sqController/sqSignUpController.js');
const router = express.Router();

router.post('/addSignUpData', signupController.addSignUpData );
router.post('/addLogInData', signupController.addLogInData);


module.exports=router;

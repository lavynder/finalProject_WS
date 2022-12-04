let express = require('express'); 
let router = express.Router();
let userControl = require('../controller/user');

// DISPLAY LOGIN          
router.get('/login', userControl.displayLogin);

// PROCESS LOGIN
router.post('login', userControl.processLogin);

// DISPLAY REGISTRATION
router.get('/register', userControl.displayRegister);

// PROCESS REGISTER
router.post('login', userControl.processRegister);

// LOGOUT
router.get('logout', userControl.logout);

module.exports = router;
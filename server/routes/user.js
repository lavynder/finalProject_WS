let express = require('express'); 
let router = express.Router();
let userControl = require('../controller/user');


// LOGIN CONTROLS
// DISPLAY LOGIN          
router.get('/login', userControl.displayLogin);

// PROCESS LOGIN
router.post('/login', userControl.processLogin);

// REGISTRATION CONTROLS
// DISPLAY REGISTRATION
router.get('/register', userControl.displayRegister);

// PROCESS REGISTER
router.post('/register', userControl.processRegister);

// LOGOUT CONTROL
router.delete('/logout', userControl.logout);

module.exports = router;
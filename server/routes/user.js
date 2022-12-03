let express = require('express'); 
let router = express.Router();
let userControl = require('../controller/user');

// DISPLAY LOGIN PAGE          
router.get('/login', userControl.displayLogin);

// DISPLAY REGISTRATION PAGE
router.get('/register', userControl.displayRegister);

module.exports = router;
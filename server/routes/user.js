let express = require('express'); 
let router = express.Router();
let userControl = require('../controller/user');

// DISPLAY REGISTRATION PAGE
router.get('/register', userControl.displayRegister);

// DISPLAY LOGIN PAGE          
router.get('/login', userControl.displayLogin);

module.exports = router;
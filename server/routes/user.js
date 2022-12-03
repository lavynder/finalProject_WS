let express = require('express'); 
let router = express.Router();
let userControl = require('../controller/user');

// DISPLAY REGISTRATION PAGE
router.get('/register', userControl.displayRegister);

// REGISTER LOGIN PAGE          
router.post('/login', userControl.displayLogin);

module.exports = router;
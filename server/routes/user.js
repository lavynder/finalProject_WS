let express = require('express'); 
let router = express.Router();
let userControl = require('../controller/user');

// BY DEFAULT, DISPLAY REGISTRATION PAGE
router.get('/', userControl.displayRegister);

module.exports = router;
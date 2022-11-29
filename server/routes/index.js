let express = require('express'); 
let router = express.Router();
let indexController = require('../controller/index');

/* BY DEFAULT, GET THE Home PAGE */
router.get('/', indexController.displayLanding);

/* GET THE Home PAGE */
router.get('/home', indexController.displayHome);

module.exports = router;
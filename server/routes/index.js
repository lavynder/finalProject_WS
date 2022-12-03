let express = require('express'); 
let router = express.Router();
let indexControl = require('../controller/index');

/* BY DEFAULT, GET THE Home PAGE */
router.get('/', indexControl.displayLanding);

/* GET THE Home PAGE */
router.get('/home', indexControl.displayHome);

/* GET THE About PAGE */
router.get('/about', indexControl.displayAbout);

/* GET THE Contact PAGE */
router.get('/contact', indexControl.displayContact);

module.exports = router;
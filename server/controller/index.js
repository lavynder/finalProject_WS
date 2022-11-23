let express = require('express');
let router = express.Router();

// DISPLAY LANDING PAGE
module.exports.displayLanding = (req, res, next) => {
    res.render('pages/index', { 
        title: 'Home'
      });
}

// DISPLAY HOME PAGE
module.exports.displayHome = (req, res, next) => {
    res.render('pages/home', { 
        title: 'Home'
      });
}

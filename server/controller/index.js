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
        title: 'home'
      });
}

// DISPLAY HOME PAGE
module.exports.displayAbout = (req, res, next) => {
  res.render('pages/about', { 
      title: 'about'
    });
}

// DISPLAY HOME PAGE
module.exports.displayContact = (req, res, next) => {
  res.render('pages/contact', { 
      title: 'contact'
    });
}

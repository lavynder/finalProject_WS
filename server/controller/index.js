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
        title: 'home',
        displayName: req.user ? req.user.displayName:''
      });
}

// DISPLAY HOME PAGE
module.exports.displayAbout = (req, res, next) => {
  res.render('pages/about', { 
      title: 'about',
      displayName: req.user ? req.user.displayName:''
    });
}

// DISPLAY HOME PAGE
module.exports.displayContact = (req, res, next) => {
  res.render('pages/contact', { 
      title: 'contact',
      displayName: req.user ? req.user.displayName:''
    });
}

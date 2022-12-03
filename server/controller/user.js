let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// CONNECT TO user MODEL
let user = require('../models/userModel');

// DISPLAY REGISTRATION PAGE
module.exports.displayLogin = (req, res, next) => {
    res.render('user/login', { 
        title: 'Login'
      });
}

//DISPLAY LOGIN PAGE
module.exports.displayRegister = (req, res, next) => {
  res.render('user/register', { 
      title: 'Register'
    });
}
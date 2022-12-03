let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// CONNECT TO user MODEL
let user = require('../models/userModel');

// DISPLAY REGISTRATION PAGE
module.exports.displayRegister = (req, res, next) => {
    res.render('user/register', { 
        title: 'Register'
      });
}
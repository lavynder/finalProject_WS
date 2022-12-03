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
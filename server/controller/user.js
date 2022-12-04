let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const passport = require('passport');

// CONNECT TO user MODEL
let userModel = require('../models/userModel');
let user = userModel.user

// DISPLAY LOGIN PAGE
module.exports.displayLogin = (req, res, next) => {
  if (!req.user) {
    res.render('user/login',
      {
        title: 'Login',
        message: req.flash('loginMessage'),
        displayName: req.user ? req.user.displayName : ''

      })
  }
  else {
    return res.redirect('/user/login')
  }

}

// PROCESS LOGIN PAGE
module.exports.processLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // SERVER ERROR
    if (err) {
      return next(err);
    }

    // AUTHENTICATION ERROR
    if (!user) {
      req.flash('loginMessage',
        'AuthenticationError');
      return res.redirect('/user/login');
    }

    req.login(user, (err) => {
      if (err) {
        return next(err)
      }
      return res.redirect('/home')
    })
  })(req, res, next)
}


//DISPLAY REGISTRATION PAGE
module.exports.displayRegister = (req, res, next) => {
  // CHECK IF USER IS NOT ALREADY LOGGED IN
  if (!req.user) {
    res.render('user/register', {
      title: 'Register',
      message: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName : ''
    })
  }
  else {
    return res.redirect('/home')
  }
}

module.exports.processRegister = (req, res, next) => {
  let newUser = user({
    'email': req.body.email,
    'username': req.body.username,
    'displayName': req.body.displayName
    // 'password':req.body.password

  });
  user.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("ERROR WHEN INSERTING NEW USER");

      if (err.name == 'UserExistsError') {
        req.flash('registerMessage',
          'Registration Error: User already exists');
      }
      return res.render('/user/register',
        {
          title: 'Register',
          registerMessage: req.flash('registerMessage'),
          displayName: req.user ? req.name.displayName : ''
        })
    }
    else {
      // IF REGISTRATION IS NOT SUCCESSFUL
      return passport.authenticate('local')(req, res, () => {
        res.redirect('/home');
      })
    }

  })
}

module.exports.logout = (req,res,next) => {
  req.logout();
  res.redirect('/home')
}
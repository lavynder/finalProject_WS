let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const passport = require('passport');

// CONNECT TO user MODEL
let userModel = require('../models/userModel');
let user = userModel.user

// LOGIN PAGES
module.exports.displayLogin = (req, res, next) => {
  res.render('user/login', {
    title: 'Login',
    displayName: req.user ? req.name.displayName : ''
  }
  );
}

module.exports.processLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // SERVER ERROR
    if (err) {
      return next(err);
    }

    // AUTHENTICATION ERROR
    if (!user) {
      req.flash('error_msg', 'Incorrect username or password');
      return res.redirect('/user/login');
    }

    req.login(user, (err) => {
      if (err) {
        return next(err)
      }
      req.flash('success_msg', "You have successfully logged in!")
      return res.redirect('/home')
    })
  })(req, res, next)
}


//REGISTRATION PAGES
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

module.exports.processRegister = async (req, res, next) => {
  // SOURCE: https://stackoverflow.com/questions/70180636/how-to-check-whether-a-user-exists-in-mongoose
  
  // CHECK TO SEE IF THE USER EXISTS
  let userExists = await user.exists({ email: req.body.email })

  if (userExists) {
    req.flash(
      'error_msg','Registration Error: User already exists!'
    )
    return res.render('user/register',
        {
          title: 'Register',
          displayName: req.user ? req.name.displayName : ''
        });
  }

  else {
    
    let newUser = user({
      email: req.body.email,
      username: req.body.username,
      displayName: req.body.displayName
    });
    user.register(newUser, req.body.password, (err) => {
      if (err) {
        console.log("ERROR WHEN INSERTING NEW USER");
      
      req.flash('error_msg', 
      'An error occured during registration, Sorry!')
      return redirect.render('user/register',
        {
          title: 'Register',
          displayName: req.user ? req.name.displayName : ''
        });
      }
      else {
        // IF REGISTRATION IS SUCCESSFUL
        return passport.authenticate('local')(req, res, () => {
          req.flash('success_msg', 
          'You have been registered and logged in!')
          res.redirect('/home');
        })
      }
    })
  }
}


// LOGOUT
module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    // IN CASE OF ERROR
    if(err) {
      return next(err);
    }
    req.flash('success_msg', 'You have been logged out!')
    res.redirect('/home')

  });
  
}
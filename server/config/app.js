// DEPENDANCIES
let createError = require('http-errors');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

/* TO ALLOW FOR A MORE SECURE WAY TO LOGOUT, ADDED METHOD-OVERRIDE 
SOURCE: https://www.youtube.com/watch?v=-RCnNyD0L-s */
let methodOverride = require('method-override');

/* FOR ENVIRONMENT VARIABLES FOR MONGODB CONNECTIVITY
SOURCE: https://www.youtube.com/watch?v=hZUNMYU4Kzo */
let env = require('dotenv').config();

let express = require('express');
let session = require('express-session');
let flash = require('connect-flash');

// PASSPORT DEPENDANCIES
let passport = require('passport');
let passportLocal = require('passport-local');
let passportGoogle = require('passport-google-oauth20')
const passportTwitter = require('passport-twitter')

// CREATE INSTANCE OF USER MODEL
let userModel = require('../models/userModel')
let user = userModel.user;


// CONFIG MONGODB
let mongoose = require('mongoose');
let DB = require('./db');

// POINT MONGOOSE TO DB URI
mongoose.connect(DB.URI);
let mongDB = mongoose.connection;
mongDB.on('error', console.error.bind(console, 'Connection Error:'));
mongDB.once('open', ()=> {
  console.log('Connected to MongoDB');
});

// STRATEGIES
let localStrategy = passportLocal.Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const twitterStrategy = require('passport-twitter')

passport.use(new twitterStrategy ({
    consumerKey: process.env.TWITTER_ID,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: 'http://127.0.0.1:3000/user/twitterRedirect'
},
  function(token, tokenSecret, profile, done) {
    user.findOne({ username: profile.username }, function(err, cred) {
      if(err) { return cb(err); }
      if(!cred) {
      
        let newUser = user({
          username: profile.username,
          displayName: profile.displayName
        });

        // SAVE THE USER INTO THE DATABASE
        newUser.save()
        return cb(null, user);
      } else {
        user.findOne({username: cred.username}, function(err, user) {
          if (err) {return cb(err); }
          if (!user) { return cb(null, false); }
          return cb(null, user);
        });
      }
    });

  }
))

let app = express();

// SETTING UP EXPRESS SESSION
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false
}));

// INITIALIZE PASSPORTS
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));

// INITIALIZE FLASH
app.use(flash());

// CREATING GLOBAL VARIABLES FOR FLASH MESSAGES IN MIDDLEWARE
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.notification = req.flash('notif')
  res.locals.error_msg = req.flash('error_msg');
  next();
})


// IMPLEMENT USER AUTHENTICATION
passport.use(user.createStrategy());

// SERIALIZE AND DESERIALIZE THE USER INFORMATION
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// SETTING UP THE REQUIRED ROUTERS
let indexRouter = require('../routes/index');
let gamesRouter = require('../routes/games');
let userRouter = require('../routes/user');
const { profile } = require('console');
const { access } = require('fs');
const { css } = require('jquery');
const { createBrotliCompress } = require('zlib');

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/', indexRouter); // localhost:3000
app.use('/user', userRouter); // localhost:3000/user
app.use('/games', gamesRouter); // localhost:3000/games


// CATCH 404 ERRORS AND FORWARD TO ERROR
app.use(function(req, res, next) {
    next(createError(404));
  });

// ERROR HANDLER
app.use(function(err, req, res, next) {
    // SET LOCALS, ONLY PROVIDE ERROR FOR DEV
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // RENDER ERROR PAGE
    res.status(err.status || 500);
    res.render('error',
    {
      title:"Error"
    }
    );
  });
  
  module.exports = app;
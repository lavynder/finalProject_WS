// 3RD PARTY PACKAGES
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash')


// FOR ENVIRONMENT VARIABLES FOR MONGODB CONNECTIVITY
// SOURCE: https://www.youtube.com/watch?v=hZUNMYU4Kzo
let env = require('dotenv').config();

// CONFIG MONGODB
let mongoose = require('mongoose');
let DB = require('./db');

// POINT MONGOOSE TO DB URI
mongoose.connect(DB.URI);
let mongDB = mongoose.connection;
mongDB.on('error', console.error.bind(console, 'Connection Error: '));
mongDB.once('open', ()=> {
  console.log('Connected to the MongoDB');
});

let app = express();

// SETTING UP EXPRESS SESSION
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false
}));

// INITIALIZE FLASH
app.use(flash());


// CREATE INSTANCE OF USER MODEL
let userModel = require('../models/userModel')
let user = userModel.user;

// IMPLEMENT USER AUTHENTICATION
passport.use(user.createStrategy());

// SERIALIZE AND DESERIALIZE THE USER INFORMATION
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// INITIALIZE PASSPORTS
app.use(passport.initialize());
app.use(passport.session());

// SETTING UP THE REQUIRED ROUTERS
let indexRouter = require('../routes/index');
let gamesRouter = require('../routes/games');
let userRouter = require('../routes/user');
const { markAsUntransferable } = require('worker_threads');

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
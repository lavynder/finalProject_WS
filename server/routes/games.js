let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// CONNECT TO monster MODEL
let games = require('../models/gamesModel');
let gamesControl = require('../controller/games');

/* CRUD OPERATIONS*/

// READ OPERATION
router.get('/', gamesControl.displayGames);

// CREATE OPERATION
// GET ROUTE FOR DISPLAYING THE CREATE PAGE
router.get('/create', gamesControl.displayCreate);

// POST ROUTE FOR PROCESSING THE ADD OPERATION
router.post('/create', gamesControl.processCreate);


// UPDATE OPERATION
// GET ROUTE FOR DISPLAYING THE UPDATE PAGE
router.get('/update/:id', gamesControl.displayUpdate);

// POST ROUTE FOR PROCESSING THE UPDATE OPERATION
router.post('/update/:id', gamesControl.processUpdate);

// DELETE OPERATION
// PERFORM THE DELETE OPERATION
router.get('/delete/:id', gamesControl.performDelete);

module.exports = router;
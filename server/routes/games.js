let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// CONNECT TO monster MODEL
let games = require('../models/gamesModel');
let gamesControl = require('../controller/games');

/* CRUD OPERATIONS*/

function requireAuth(req,res,next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next()
}


// READ OPERATION
router.get('/', gamesControl.displayGames);

// CREATE OPERATION
// GET ROUTE FOR DISPLAYING THE CREATE PAGE
router.get('/create', requireAuth, gamesControl.displayCreate);

// POST ROUTE FOR PROCESSING THE ADD OPERATION
router.post('/create', requireAuth, gamesControl.processCreate);


// UPDATE OPERATION
// GET ROUTE FOR DISPLAYING THE UPDATE PAGE
router.get('/update/:id', requireAuth, gamesControl.displayUpdate);

// POST ROUTE FOR PROCESSING THE UPDATE OPERATION
router.post('/update/:id', requireAuth, gamesControl.processUpdate);

// DELETE OPERATION
// PERFORM THE DELETE OPERATION
router.get('/delete/:id', requireAuth, gamesControl.performDelete);

module.exports = router;
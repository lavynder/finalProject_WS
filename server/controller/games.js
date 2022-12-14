let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// CONNECT TO monster MODEL
let games = require('../models/gamesModel');

/* CRUD OPERATIONS*/

// READ
module.exports.displayGames = (req, res, next) => {
    games.find((err, entryRead) => {
        if (err) {
            return console.log(err);
        }
        else {
            res.render('games/read', {
                title: 'Game Reviews',
                entryRead: entryRead,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
}

// CREATE
// DISPLAY
module.exports.displayCreate = (req, res, next) => {
    res.render('games/create',
        {
            title: 'Add entry',
            displayName: req.user ? req.user.displayName : ''
        });
}

// PROCESS
module.exports.processCreate = (req, res, next) => {
    // CREATES AN OBJECT TO INSERT INTO THE TABLE
    let newGames = games({
        'username': req.body.username,
        'gameTitle': req.body.gameTitle,
        'genre': req.body.genre,
        'desc': req.body.desc,
        'rating': req.body.rating

    });
    // INSERTS THE OBJECT INTO THE TABLE
    games.create(newGames, (err, games) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // NOTIFIES THE USER USING A FLASH MESSSAGE AND REDIRECTS TO THE DATABASE
            req.flash('notif', 'Entry has been added!')
            res.redirect('/games');
        }
    });
}


// UPDATE
// DISPLAY
module.exports.displayUpdate = (req, res, next) => {
    let id = req.params.id;
    games.findById(id, (err, entryRead) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('games/update',
                {
                    title: 'Update Entry',
                    entryRead: entryRead,
                    displayName: req.user ? req.user.displayName:''
                });
        }
    });
}

// PROCESS
module.exports.processUpdate = (req, res, next) => {
    let id = req.params.id;
    let updateEntry = games({
        '_id': id,
        'username': req.body.username,
        'gameTitle': req.body.gameTitle,
        'genre': req.body.genre,
        'desc': req.body.desc,
        'rating': req.body.rating
    });
    games.updateOne({ _id: id }, updateEntry, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            req.flash('notif', 'Entry has been updated!')
            res.redirect('/games')
        }
    });
}

// DELETE
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    games.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            req.flash('notif', 'Entry has been deleted!')
            res.redirect('/games')
        }
    });
}
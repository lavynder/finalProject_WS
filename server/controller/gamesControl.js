let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// CONNECT TO monster MODEL
let games = require('../models/gamesModel');

/* CRUD OPERATIONS*/

// READ
module.exports.displayGames = (req,res,next)=> {
    games.find((err, gamesList)=> {
        if(err)
        {
            return console.log(err);
        }
        else
        {
            res.render('games/read', {
                title: 'Games Database', 
                gamesList: gamesList
            });
        }
    }); 
}

// CREATE
// DISPLAY
module.exports.displayCreate = (req,res,next)=> {
    res.render('games/create', 
    {title: 'Add entry'});
}

// PROCESS
module.exports.processCreate = (req,res,next)=> {
    let newGames = games ({
        'username':req.body.username,
        'gameTitle':req.body.gameTitle,
        'genre':req.body.genre,
        'desc':req.body.desc,
        'dateFinished':req.body.date,
        'rating':req.body.rating

    });
    games.create(newGames, (err, games) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/gamesIndex');
        }
    });
}


// UPDATE
// DISPLAY
module.exports.displayUpdate = (req,res,next)=> {
    let id = req.params.id;
    games.findById(id, (err, entryUpdate) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('games/update', 
            {title: 'Update Entry', 
            entryUpdate: entryUpdate
            });
        }
    });
}

// PROCESS
module.exports.processUpdate = (req,res,next)=> {
    let id = req.params.id;
    let updateEntry = games({
        '_id':id,
        'username':req.body.username,
        'gameTitle':req.body.gameTitle,
        'genre':req.body.genre,
        'desc':req.body.desc,
        'dateFinished':req.body.date,
        'rating':req.body.rating
    });
    games.updateOne({_id:id}, updateEntry, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/gamesIndex')
        }
    });
}

// DELETE
module.exports.performDelete = (req,res,next)=> {
    let id = req.params.id;
    games.deleteOne({_id:id}, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/gamesIndex')
        }   
    });
}
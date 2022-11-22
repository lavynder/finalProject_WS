let mongoose = require('mongoose');

// CREATE monster MODEL

let gamesModel = mongoose.Schema({
    username: String,
    gameTitle: String,
    genre: String,
    desc: String,
    dateFinished: Date,
    rating: Number
    },
    {
        collection: "gamesDatabase"
    }
);

module.exports = mongoose.model("games", gamesModel);

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let user = mongoose.Schema({
    username:
    {
        type: String,
        default:'',
        trim: true,
        required:'Username is required!'
    },
    
    /* password:
    {
        type: String,
        default:'',
        trim: true,
        required:'Password is required!'
    }, */
    displayName:
    {
        type: String,
        default:'',
        trim: true,
        required:'Display name is required!'
    },
    created:
    {
        type: Date,
        default: Date.now
    },
    update:
    {
        type: Date,
        default: Date.now
    }
},
{
    collection: 'user'
}
)

// CONFIGURE OPTIONS FOR USER MODEL
let options = ({missingPasswordError: 'Wrong/Missing password'});
user.plugin(passportLocalMongoose,options);
module.exports.user = mongoose.model('user', user);
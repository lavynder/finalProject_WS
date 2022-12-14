let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate')

let user = mongoose.Schema({

    email:
    {
        type: String,
        default:'',
        trim: true,
        required:'Email is required!'
    },
    
    username:
    {
        type: String,
        default:'',
        trim: true,
        required:'Name is required!'
    },
    
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
user.plugin(findOrCreate);

module.exports.user = mongoose.model('user', user);
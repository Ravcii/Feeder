mongoose = require('mongoose');

mongoose.model('User', mongoose.Schema({
    login: String,
    password: String,
    email: String,
    follows: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, { versionKey: false }));
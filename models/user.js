mongoose = require('mongoose');

mongoose.model('User', mongoose.Schema({
    login: String,
    password: String,
    email: String
}, { versionKey: false }));
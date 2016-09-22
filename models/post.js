mongoose = require('mongoose');

mongoose.model('Post', mongoose.Schema({
    author: {type: String, ref: 'User'},
    text: String
}, { versionKey: false }));
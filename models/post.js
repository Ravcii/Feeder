mongoose = require('mongoose');

mongoose.model('Post', mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    text: String
}, { versionKey: false }));
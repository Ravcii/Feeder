module.exports.init = function (app) {
    app.post('/add', function (req, res) {
        if (!req.session._id) {
            res.redirect('/');
        } else {
            mongoose.model('Post')({
                author: req.session._id,
                authorLogin: {type: String, ref: 'User'},
                text: req.body.text
            }).save();
            res.redirect('/');
        }
    });
}
module.exports.init = function (app) {
    app.get('/addfollow/:uid', function (req, res) {
        if (!req.session._id) {
            res.redirect('/');
        } else {
            mongoose.model('User').findByIdAndUpdate(
                req.session._id,
                {$addToSet: {'follows': req.params.uid}},
                function () { res.redirect('/'); }
            );

        }
    });
    app.get('/removefollow/:uid', function (req, res) {
        if (!req.session._id) {
            res.redirect('/');
        } else {
            mongoose.model('User').update(
                req.session._id,
                {$pull: {'follows': req.params.uid}},
                function () { res.redirect('/'); }
            );

        }
    });
};
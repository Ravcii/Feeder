module.exports.getUserById = function(req, res, next) {
    if (req.session._id && !req.session.login) {
        mongoose.model('User').findById(req.session._id, function (e, user) {
            req.session.login = user.login;
            req.session.email = user.email;
            next();
        });
    } else next();
};
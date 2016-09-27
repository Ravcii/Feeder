module.exports.getUserById = function(req, res, next) {
    if (req.session._id) {
        mongoose.model('User').findById(req.session._id, function (e, user) {
            user.follows.push(user._id);
            req.session.login = user.login;
            req.session.email = user.email;
            req.session.follows = user.follows;
            next();
        });
    } else next();
};
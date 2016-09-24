module.exports.getAllPosts = function(req, res, next) {
    mongoose.model('Post').find({}).populate('author').exec(function (e, posts) {
        req.posts = posts;
        next();
    });
};

module.exports.getFollowPosts = function(req, res, next) {
    console.log(req.session.follows);
    mongoose.model('Post').find({author: {$in: req.session.follows}}).populate('author').exec(function (e, posts) {
        req.posts = posts;
        next();
    });
};
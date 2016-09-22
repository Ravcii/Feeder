module.exports.getAllPosts = function(req, res, next) {
    mongoose.model('Post').find({}).populate('author').exec(function (e, posts) {
        req.posts = posts;
        next();
    });
};
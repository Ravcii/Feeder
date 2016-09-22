module.exports.init = function (app, postsHelper) {
    app.get('/', postsHelper.getAllPosts, function(req, res, next) {
        res.render('index', {
            title: 'Feeder',
            session: req.session,
            posts: req.posts.reverse()
        });
    });
};
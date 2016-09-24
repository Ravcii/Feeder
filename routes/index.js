module.exports.init = function (app, postsHelper) {
    app.get('/', postsHelper.getAllPosts, function(req, res) {
        res.render('index', {
            title: 'Feeder',
            session: req.session,
            posts: req.posts.reverse()
        });
    });
    app.get('/f', postsHelper.getFollowPosts, function(req, res) {
        if(!req.session._id) res.redirect('/');
        else
            res.render('index', {
                title: 'Feeder',
                session: req.session,
                posts: req.posts.reverse(),
                f: true
            });
    });
};
module.exports.init = function (app, io, pug) {

    //Real-time updates
    io.on('connection', function (socket) {
        socket.on('post added', function (sentData) {
            mongoose.model('Post')({
                author: sentData._id,
                text: sentData.text
            }).save(function (e, model) {
                if(e){
                    res.send('Error: ' + e);
                } else {
                    mongoose.model('Post').findOne(model).populate('author').exec(function (e, postData) {
                        var html = pug.renderFile('./views/post.pug', {
                            post: postData,
                            session: { _id: sentData._id }
                        });
                        io.sockets.emit('update feed', html);
                    });
                }
            });
        });
    });

    app.get('/', function(req, res) {
        mongoose.model('Post').find({}).populate('author').sort("-_id").exec(function (e, posts) {
            res.render('index', {
                session: req.session,
                posts: posts
            });
        });
    });

    app.get('/f', function(req, res) {
        if (!req.session._id) {
            res.redirect('/');
        } else {
            mongoose.model('Post')
                .find({author: {$in: req.session.follows}})
                .populate('author')
                .sort("-_id")
                .exec(function (e, posts) {
                res.render('index', {
                    session: req.session,
                    posts: posts,
                    f: true
                });
            });
        }
    });
};
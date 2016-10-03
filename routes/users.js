module.exports.init = function (app) {

    //Login route
    app.get('/login', function(req, res){
        res.render('login', {
            session: req.session
        });
    });

    app.post('/login', function(req, res){
        mongoose.model('User').findOne({'login':req.body.login}).exec(function(e, user){
            if(!user) res.send('Такого пользователя нет.');
            else if(user.password === req.body.pwd){
                req.session._id = user._id;
                res.redirect('/');
            } else {
                res.send('Пароли не совпадают.');
            }
        });
    });

    //Register route
    app.get('/register', function(req, res){
        res.render('register', {
            session: req.session
        });
    });

    app.post('/register', function(req, res){
        mongoose.model('User').find(
            { $or:[ {'login':req.body.login}, {'email':req.body.email}]}
        ).exec(function(e, users){
            if(users.length > 0){
                res.send('Такой пользователь уже есть! Вернитесь назад и попробуйте ещё раз.');
            } else {
                mongoose.model('User')({
                    login: req.body.login,
                    password: req.body.pwd,
                    email: req.body.email
                }).save(function (e, user) {
                    req.session._id = user._id;
                    res.redirect('/');
                });
            }
        });
    });
    
    app.get('/logout', function (req, res) {
        req.session.destroy();
        res.redirect('/')
    });
};
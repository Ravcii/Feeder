var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongo');
var mongoose = require('mongoose');
var expressSession = require('express-session');

var app = express();

mongoose.connect('mongodb://localhost/dbdata');

var userModel = require('./models/user');
var postModel = require('./models/post');

var usersHelper = require('./helpers/usersHelper');
var postsHelper = require('./helpers/postsHelper');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({secret: 'rofl'}));
app.use(cookieParser());
app.use(usersHelper.getUserById);

app.set('views', './views');
app.set('view engine', 'pug');

var indexRoute = require('./routes/index');
indexRoute.init(app, postsHelper);

var usersRoute = require('./routes/users');
usersRoute.init(app);

var postsRoute = require('./routes/posts');
postsRoute.init(app);

var followsRoute = require('./routes/follows');
followsRoute.init(app);

app.listen(8080);
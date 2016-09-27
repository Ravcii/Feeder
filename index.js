var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongo');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var pug = require('pug');

mongoose.connect('mongodb://localhost/dbdata');

var userModel = require('./models/user');
var postModel = require('./models/post');

var usersHelper = require('./helpers/usersHelper');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({secret: 'rofl'}));
app.use(cookieParser());
app.use(usersHelper.getUserById);
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

var indexRoute = require('./routes/index');
indexRoute.init(app, io, pug);

var usersRoute = require('./routes/users');
usersRoute.init(app);

var followsRoute = require('./routes/follows');
followsRoute.init(app);

http.listen(8080);
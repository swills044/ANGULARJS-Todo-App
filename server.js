//REQUIRE PACKAGES
var express = require('express');
var mongoose = require('mongoose'); //ORM for Mongodb
var bodyParser = require('body-parser'); // middleware
var cookieParser = require('cookie-parser'); // manage sessions
var passport = require('passport'); // authentication

//Setup application
var app = express();

//Register Models
var models = require('./models/Models')(mongoose);

// configure App
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(bodyParser.json({
    limit: '50mb'
}));

//Auth Module
require('./auth');

//Register routes
require('./routes/apiRoutes')(app, models);
require('./routes/UserRoutes')(app);

// app.get('/', function (req, res) {
// 	res.send("Hello All Working!");
// })

//Setup mongodb connection
mongoose.connect('mongodb://todoadmin:Test1234@ds155191.mlab.com:55191/heroku_0lkc0xd4');
var db = mongoose.connection; db.once('open', function(){console.log('DB connected')}); //Check Connection

//Listen on port
app.listen(process.env.PORT || 5000, function(){console.log('connected!')})


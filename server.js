//REQUIRE PACKAGES
var express = require('express');
var mongoose = require('mongoose'); //ORM for Mongodb
var bodyParser = require('body-parser'); // middleware

//Setup application
var app = express();

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
require('./routes/auth');

//Register routes
require('./routes/routes')(app);

//Setup mongodb connection
mongoose.connect('mongodb://localhost:27017/todoDB');

//Listen on port
app.listen(process.env.PORT || 5000, function(){console.log('connected!')})

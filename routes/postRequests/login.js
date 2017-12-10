//''''''''''''''''''
//Login
//''''''''''''''''''

//Dependencies
var crypto = require('crypto');
var mongoose = require('mongoose');
var User = require('../models/User').model;
var AccessToken = require('../models/AccessToken').model;
var passport = require('passport');


module.exports = function(app) {

    app.post('/login', function(req, res) {
        //Check for UserName and Pasword
        if (!req.body.UserName || !req.body.Password) {
            res.status(400).json({
                error: "Bad Request"
            });
        }
        //Find User by UserName
        var query = {
            UserName: req.body.UserName
        };
        User.findOne(query, function(err, user) {
            if (!user) {
                res.status(500).send('No user')
            };
            //If a User exists then validate password and create a new token
            if (user) {

                if (user.ValidatePassword(req.body.Password, user.Password)) {

                    var accesstoken = new AccessToken({
                        UserId: user._id,
                        TokenString: crypto.randomBytes(32).toString('hex'),
                        UserName: user.UserName

                    });

                    accesstoken.save(function(err) {
                        var UserId = user._id;
                        AccessToken.findByIdAndRemove(UserId, function(err, user) {
                            if (err) {
                                res.send(err);
                            } else {
                              res.status(200).json(accesstoken);
                            }
                        })

                    });

                } else {
                    res.status(401).send('wrong');
                };




            }



        });
    });
};

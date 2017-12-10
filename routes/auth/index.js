//''''''''''''''''''
//Used for authenticating routes and allowing users to acces their data
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var AccessToken = require('../models/AccessToken').model;
var User = require('../models/User').model;
var BearerStrategy = require('passport-http-bearer').Strategy;
var mongoose = require('mongoose');
var config = require('../Config');

passport.use(new BearerStrategy(
    function(accessToken, done) {
      //Searches for accessToken
        AccessToken.findOne({
            TokenString: accessToken
        }, function(err, token) {
            if (err) {
                return done(err);
            }
            //If no accessToken is found then return done
            if (!token) {

                return done(null, false);
            }
            //If the token expired then remove the token
            if (Date.now() > token.Expires) {

                AccessToken.remove({
                    token: accessToken
                }, function(err) {
                    if (err) {

                        return done(err);
                    }
                });

                return done(null, false, {
                    message: 'Token expired'
                });
            }
            //Find the user linked with the token
            User.findById(token.UserId, function(err, user) {

                if (err) {
                    return done(err);
                }
                //No user found then return unknown (user could have been deleted)
                if (!user) {
                    return done(null, false, {
                        message: 'Unknown user'
                    });
                }

                //Return done with the user infomation/data
                done(null, user, null);
            });
        });
    }
));

var passport = require('passport');
var AccessToken = require('../models/AccessToken').model;
var User = require('../models/User').model;
var BearerStrategy = require('passport-http-bearer').Strategy;
var mongoose = require('mongoose');
var config = require('../Config');


passport.use(new BearerStrategy(
    function(accessToken, done) {
        AccessToken.findOne({
            TokenString: accessToken
        }, function(err, token) {
            if (err) {

                return done(err);
            }

            if (!token) {

                return done(null, false);
            }
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

            User.findById(token.UserId, function(err, user) {

                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, {
                        message: 'Unknown user'
                    });
                }

                /*var customUser = JSON.parse(JSON.stringify(user));
                customUser.Claims = token.Claims.split('|').map(function(c) {
                    var s = c.split(':');
                    return {
                        Name: s[0],
                        Value: s[1]
                    } 
                }); */
                done(null, user, null);
            });
        });
    }
));

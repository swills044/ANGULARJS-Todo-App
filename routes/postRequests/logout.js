//''''''''''''''''''
//Logout
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var mongoose = require('mongoose');
var AccessToken = require('../models/AccessToken').model;

module.exports = function(app) {

    app.post('/logout', passport.authenticate('bearer', {
        session: false
      }), function(req, res) {
        //Query for search
        var query = {
            UserId: req.user._id
        }
        //Logging out consists of remove the AccessToken therefore a valid login is removed and user is blocked out.
        AccessToken.findOneAndRemove(query, function(err, token) {

            if (err) {
                res.status(500).send(err);
            } else {
                res.redirect('/');
            }

        })
    });

};

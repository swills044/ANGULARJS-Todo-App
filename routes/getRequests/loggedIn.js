//''''''''''''''''''
//Checks the logged in user
//''''''''''''''''''

//Dependencies
var crypto = require('crypto');
var mongoose = require('mongoose');
var User = require('../models/User').model;
var AccessToken = require('../models/AccessToken').model;
var passport = require('passport');


module.exports = function(app) {

  app.get('/api/user/:_id', passport.authenticate('bearer', {
      session: false
    }), function(req, res, next) {
      //Query for searching database
      var query = {
        _id: req.params._id
      }
      User.findOne(query, function(err, data){
        if (err) {
          res.status(400).send(err);
        }else {
          res.status(200).send(data);
        }

      })
    })

};

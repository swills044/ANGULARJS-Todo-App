//''''''''''''''''''
//Get all the users in the project
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var mongoose = require('mongoose');
var UserProjects = require('../models/UserProjects').model;
var project = require('../models/Project').model;
var Promise = require("bluebird");
var User = require('../models/User').model;

module.exports = function(app) {

  app.get('/userprojects/:id', passport.authenticate('bearer', {
      session: false
    }), function(req, res) {
      //Query for searching for all users link with the project ID
      var query = {
          Project: req.params.id
      }
      UserProjects.find(query, function(err, data) {
        //Promise creates new array with linked users
          var mappingFunction = function(array) {
              return new Promise.map(array, function(item) {
                  return new Promise(function(resolve, reject) {
                      var query = {
                          _id: item.User
                      };
                      User.findOne(query, function(err, data) {
                          if (err) reject(err);
                          resolve(data);
                      });
                  })
              });
          }
          //Linked users
          mappingFunction(data).then(function(results) {
              res.status(200).send(results);
          });


      })
  })


};

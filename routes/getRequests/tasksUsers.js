//''''''''''''''''''
//All users in a task
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/User').model;
var taskUsers = require("../models/taskUsers").model;
var Promise = require("bluebird");

module.exports = function(app) {

    app.get('/taskUsers/:id', passport.authenticate('bearer', {
        session: false
      }), function(req, res) {
        //Query for searching collection
        var query = {
            Task: req.params.id
        }
        taskUsers.find(query, function(err, data) {
          //Promise is created to find all linked users with the task ID
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
            //All linked users are sent
            mappingFunction(data).then(function success(results) {
                res.status(200).send(results);
            }, function failure() {
                res.status(500).send("Some error occured");
            });


        })
    })

};

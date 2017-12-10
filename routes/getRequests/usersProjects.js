//''''''''''''''''''
//Finds all projects link to the user
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var mongoose = require('mongoose');
var UserProjects = require('../models/UserProjects').model;
var project = require('../models/Project').model;
var Promise = require("bluebird");

module.exports = function(app) {

    app.get('/allProjects/:id', passport.authenticate('bearer', {
        session: false
    }), function(req, res) {
      //Query for searching
        var query = {
            User: req.params.id
        };
        UserProjects.find(query, function(err, data) {
          //Promise created to filter all linked projects and then those projects are found and sent in an array
            var mappingFunction = function(array) {
                return new Promise.map(array, function(item) {
                    return new Promise(function(resolve, reject) {
                        var query = {
                            _id: item.Project
                        };
                        project.findOne(query, function(err, data) {
                            if (err) reject(err);
                            resolve(data);
                        });
                    })
                });
            }
            //all project found
            mappingFunction(data).then(function success(results) {
                res.status(200).send(results);
            }, function failure() {
                res.status(500).send("Some error occured");
            });


        })

    })

};

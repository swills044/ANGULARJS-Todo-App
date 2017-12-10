//''''''''''''''''''
//Checks what users are not in the project
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/User').model;
var Promise = require("bluebird");
var UserProjects = require('../models/UserProjects').model;

module.exports = function(app) {

    app.get('/notinproject/:id', passport.authenticate('bearer', {
        session: false
      }), function(req, res) {
        //Collect all users
        User.find(function(err, data) {
            var mappingFunction = function(array) {
              //create a new promise that filters the users
                return new Promise.map(array, function(item) {
                    return new Promise(function(resolve, reject) {
                      //Query for searching if the users are in the promise
                        var query = {
                            User: item._id,
                            Project: req.params.id
                        }
                        //searches project for users
                        UserProjects.findOne(query, function(err, data) {
                            if (err) reject(err);
                            //if the user is not in the collection then it will return null
                            if (data == null) {
                                resolve(item);
                            } else {
                                resolve(null);
                            }
                        });
                    })
                });
            }
            //When promise is completed then filter all true users into a array and not null(false)
            mappingFunction(data).then(function success(results) {
                var r = results.filter(function(v) {
                    return !!v
                });
                res.status(200).send(r);

            });

        });


    })

};

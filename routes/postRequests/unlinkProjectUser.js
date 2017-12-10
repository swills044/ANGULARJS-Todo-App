//''''''''''''''''''
//Unlink a user from the project
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var mongoose = require('mongoose');
var UserProjects = require('../models/UserProjects').model;

module.exports = function(app) {

    app.post('/api/project/unlinkuser', function(req, res) {
      //Query for searching
        var query = {
            Project: req.body.Project,
            User: req.body.User
        }

        //Find the project entry and remove it
        UserProjects.findOneAndRemove(query, function(err, user) {

            if (err) {
                res.status(500).send(user);
            }
            res.status(200).send(user);

        })
    });

};

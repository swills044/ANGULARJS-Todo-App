//''''''''''''''''''
//Link a user to a project
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var mongoose = require('mongoose');
var UserProjects = require('../models/UserProjects').model;


module.exports = function(app) {

    app.post('/api/project/linkuser', function(req, res) {
      //Query for searching
        var query = {
            User: req.body.User,
            Project: req.body.Project
        }
        //Check for already linked users
        UserProjects.count(query, function(err, count) {

            if (count > 0) {

                res.status(500).send('User Already In project!');

            } else {
              //if no dupe links then save
                var data = new UserProjects();
                data.User = req.body.User;
                data.Project = req.body.Project;
                data.Type = req.body.Type;

                data.save(function(err, data) {

                    if (err) {

                        res.status(500).send(err);

                    } else {

                        res.status(200).send(data);

                    }


                })

            }

        })
    });

};

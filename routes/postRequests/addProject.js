//''''''''''''''''''
//Add a project
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var mongoose = require('mongoose');
var UserProjects = require('../models/UserProjects').model;
var project = require('../models/Project').model;


module.exports = function(app) {

    app.post('/api/projects', passport.authenticate('bearer', {
        session: false
      }), function(req, res, next) {
        //Creates new object with project model
        var data = new project(req.body);
        //Query for searching
        var query = {
            Name: req.body.Name,
            CreatedById: req.user._id,
            Description: req.body.Description
        }

        //Add a project and a userproject
        data.CreatedById = req.user._id;
        //Search for clone projects
        project.find(query, function(err, project) {
            if (project.CreatedById == req.user._id) {
                res.status(500).send('failed');
                next();
            }
            //If no dupe projects then save
            if (project.length == 0) {
                data.save(function(err) {
                    if (err) {
                        res.status(500).send(err);
                    } else {

                        var query = {
                            User: req.user._id,
                            Project: data._id
                        }
                        //Check for projects with linked users(unlikely)
                        UserProjects.count(query, function(err, count) {

                            if (err) {
                                res.status(500).send(err);
                            }
                            //If there is a user linked(unlikely as there is only one creation)
                            if (count > 0) {
                                res.status(500).send('User is already in this project');
                            } else {
                              //Save the linked creation user
                                var UserProject = new UserProjects();
                                UserProject.Project = data._id;
                                UserProject.User = req.user._id;

                                UserProject.save(function(err) {

                                    if (err) {
                                        res.status(500).send('hi');
                                    }
                                    res.status(200).json(UserProject);

                                })

                            }

                        })

                    }


                })
            }
            if (err) {
                res.status(500).send(err);
            }
        })

    });

};

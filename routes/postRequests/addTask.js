//''''''''''''''''''
//Add task
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var mongoose = require('mongoose');
var UserProjects = require('../models/UserProjects').model;
var task = require('../models/Task').model;
var taskusers = require('../models/taskUsers').model;

module.exports = function(app) {

    app.post('/api/task', passport.authenticate('bearer', {
        session: false
      }), function(req, res, next) {
        //New object using task model
        var newTask = new task(req.body);
        //Query for searching
        var query = {
            Name: req.body.Name,
            CreatedById: req.user._id,
            Description: req.body.Description
        }

        //Add a project and a userproject
        newTask.CreatedById = req.user._id;
        //Check if the task has already been created
        task.find(query, function(err, data) {
            if (data.CreatedById == req.user._id) {
                res.status(500).send('failed');
                next();
            }
            //If no task is returned/found then save the object
            if (data.length == 0) {
                newTask.save(function(err) {
                    if (err) {
                        res.status(500).send(err);
                    } else {

                        var query = {
                            User: req.user._id,
                            Task: data._id
                        }
                        //Create the linked user(Creation user)
                        taskusers.count(query, function(err, count) {

                            if (err) {
                                res.status(500).send(err);
                            }
                            //Check for dupes
                            if (count > 0) {
                                res.status(500).send('User is already in this project');
                            } else {
                              //save
                                var taskuser = new taskusers();
                                taskuser.Task = data._id;
                                taskuser.User = req.user._id;

                                taskuser.save(function(err) {

                                    if (err) {
                                        res.status(500).send(err);
                                    }
                                    res.status(200).json(taskuser);

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

//''''''''''''''''''
//Get all the tasks in the project
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var mongoose = require('mongoose');
var Task = require('../models/Task').model;
var moment = require('moment');
var Promise = require("bluebird");

module.exports = function(app) {

    app.get('/api/project_tasks/:id', passport.authenticate('bearer', {
        session: false
      }), function(req, res) {
        //Query for searching tasks
        var query = {
            Project: req.params.id
        }
        //Search for tasks with the project ID
        Task.find(query, function(err, tasks) {
            if (err) {
                res.status(500).send(err);
            } else {
                var newtasks = [];
                //Promise created to format the date and then send the formatted task
                var format = new Promise(
                    function(resolve, reject) {
                        tasks.forEach(function(task) {
                            var newdate = moment(task.DueDate).format('DD-MM-YYYY');
                            newtask = {
                                _id: task._id,
                                CreatedById: task.CreatedById,
                                Name: task.Name,
                                DueDate: newdate,
                                Project: task.Project,
                                Description: task.Description
                            }
                            newtasks.push(newtask);
                        })
                        resolve(newtasks);
                    }
                )
                //formatted task
                format.then(function(newtasks) {
                    res.status(200).send(newtasks);
                })
            }
        })

    })

};

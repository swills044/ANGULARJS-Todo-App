//''''''''''''''''''
//All users linked tasks
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var mongoose = require('mongoose');
var Task = require('../models/Task').model;
var Promise = require("bluebird");
var moment = require('moment');

module.exports = function(app) {

    app.get('/usertasks', passport.authenticate('bearer', {
        session: false
      }), function(req, res) {
        //Query for searching
        query = {
            CreatedById: req.user.id
        }
        //Finds all tasks with that query ID
        Task.find(query, function(err, task) {

            if (err) {
                res.status(400).send(err);
            } else {

                var newtasks = [];
                //Promise created to format tasks date
                var format = new Promise(
                    function(resolve, reject) {
                        task.forEach(function(tasks) {
                            var newdate = moment(tasks.DueDate).format('DD-MM-YYYY');
                            newtask = {
                                _id: tasks._id,
                                CreatedById: tasks.CreatedById,
                                Name: tasks.Name,
                                DueDate: newdate,
                                Project: tasks.Project,
                                ProjectName: tasks.ProjectName,
                                Description: task.Description
                            }
                            newtasks.push(newtask);
                        })
                        resolve(newtasks);
                    }
                )
                //All formatted tasks
                format.then(function(newtasks) {
                    res.status(200).send(newtasks);
                })
            }


        })
    });

};

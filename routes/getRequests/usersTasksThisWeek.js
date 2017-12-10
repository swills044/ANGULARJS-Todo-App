//''''''''''''''''''
//All users tasks due this week
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var mongoose = require('mongoose');
var Task = require('../models/Task').model;
var moment = require('moment');
var Promise = require("bluebird");

module.exports = function(app) {

    app.get('/taskweek', passport.authenticate('bearer', {
        session: false
      }), function(req, res) {
        //Query for searching
        var query = {
            CreatedById: req.user.id
        }
        //tasks found with the query ID
        Task.find(query, function(err, task) {
            if (err) {
                res.status(500).send('failed');
            } else {
                var tasks = [];
                //Loops array filtering each matched date
                task.forEach(function(task) {
                    var date = moment(task.DueDate).format('DD');
                    var date = parseInt(date);
                    var today = moment(Date.now()).format('DD');
                    var today = parseInt(today);
                    var end = today + 7;
                    for (; today < end; today++) {
                        var days = []
                        days.push(today);
                        var i = days.indexOf(date);
                        if (i > -1) {
                            tasks.push(task);
                        }
                    }
                })

                var newtasks = [];
                //Promise created to filter matched date tasks
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
                                ProjectName: task.ProjectName,
                                Description: task.Description

                            }
                            newtasks.push(newtask);
                        })
                        resolve(newtasks);
                    }
                )
                //Matched and formatted tasks
                format.then(function(newtasks) {
                    res.status(200).send(newtasks);
                })




            }
        })
    })

};

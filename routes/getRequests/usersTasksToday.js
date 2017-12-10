//''''''''''''''''''
//Users tasks due today
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var mongoose = require('mongoose');
var Task = require('../models//Task').model;
var moment = require('moment');
var Promise = require("bluebird");

module.exports = function(app) {

  app.get('/tasktoday', passport.authenticate('bearer', {
      session: false
    }), function(req, res) {
      //Query for searching
      var query = {
          CreatedById: req.user.id
      }
      //Find all tasks with the query ID
      Task.find(query, function(err, task) {
          if (err) {
              res.status(500).send('failed');
          } else {
              var tasks = [];
              //Task are looped through and matched to the date today
              task.forEach(function(task) {
                  var date = moment(task.DueDate).format('YYYY-MM-DD');
                  var now = moment(Date.now()).format('YYYY-MM-DD');
                  if (date == now) {
                      tasks.push(task);
                  }
              })
              var newtasks = [];
              //Tasks matched are formatted
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

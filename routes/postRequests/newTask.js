//''''''''''''''''''
//Create a new task
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var mongoose = require('mongoose');
var Task = require('../models/Task').model;

module.exports = function(app) {

    app.post('/api/task',passport.authenticate('bearer', {
        session: false
      }), function(req, res) {
        //New object using the task model
      var newTask = new Task(req.body);


      newTask.CreatedById = req.user._id;
      //Task is saved, tasks can have the same names
  		newTask.save(function(err){
  			if (err){
  				res.status(500).send(err);
        }
  			else {
  				res.json(newTask);
  			}
      })


  		})

};

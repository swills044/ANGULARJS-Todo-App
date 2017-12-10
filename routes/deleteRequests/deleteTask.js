//''''''''''''''''''
//Delete Task
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var mongoose = require('mongoose');
var Task = require('../models/Task').model;


module.exports = function(app) {


    app.delete('/api/task/:_id', function(req, res) {
      //Query for searching
      var queryString = {
        _id: req.params._id
      }
      //Find the task with the query ID and remove it
      Task.findOneAndRemove(queryString, function (err, data) {
              if (err)
                  res.status(500).send(err);
              else {
                  if (data) {
                      res.status(200).json('Item Deleted');
                  } else
                      res.status(404).json({
                          error: 'Not Found'
                      });
              }
          });

    });

};

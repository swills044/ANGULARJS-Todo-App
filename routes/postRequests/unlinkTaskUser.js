//''''''''''''''''''
//Unlink the user from the task
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var mongoose = require('mongoose');
var taskUsers = require("../models/taskUsers").model;

module.exports = function(app) {

    app.post('/api/task/unlinkuser', function(req, res) {
      //query for searching
        var query = {
            Task: req.body.Task,
            User: req.body.User
        }

        //Find the project entry and remove it
        taskUsers.findOneAndRemove(query, function(err, user) {

            if (err) {
                res.status(500).send(user);
            }
            res.status(200).send(user);

        })
    });
};

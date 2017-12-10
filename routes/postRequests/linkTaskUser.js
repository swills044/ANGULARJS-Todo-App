//''''''''''''''''''
//Link user to task
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var mongoose = require('mongoose');
var taskUsers = require("../models/taskUsers").model;

module.exports = function(app) {

    app.post('/api/task/linkuser', function(req, res) {
      //Query for search
        var query = {
            User: req.body.User,
            Task: req.body.Task
        }
        //Check for dupe links
        taskUsers.count(query, function(err, count) {

            if (count > 0) {

                res.status(500).send('User Already In project!');

            } else {
              //if no duped users then save
                var data = new taskUsers();
                data.User = req.body.User;
                data.Task = req.body.Task;

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

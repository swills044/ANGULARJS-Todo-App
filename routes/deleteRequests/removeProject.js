//''''''''''''''''''
//Remove project and all related user links and tasks
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var mongoose = require('mongoose');
var UserProjects = require('../models/UserProjects').model;
var project = require('../models/Project').model;
var Task = require('../models/Task').model;

module.exports = function(app) {

    app.delete('/userproject/:id', passport.authenticate('bearer', {
        session: false
      }), function(req, res) {
        //Query for searching
        var query = {
            _id: req.params.id
        }
        //Find project with query ID
        project.findByIdAndRemove(query, function(err, project) {
          //Query search for linked project users
            var query = {
                Project: req.params.id
            }
            //Search linked users
            UserProjects.find(query).remove(function() {

                if (err) {
                    res.status(500).send(err);
                } else {
                  //Use query to find all tasks related and remove them
                    Task.find(query).remove(function() {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.status(200).send(project);
                        }
                    })
                }

            })


            if (err) {
                res.status(500).send(err);
            }

        })
    })

};

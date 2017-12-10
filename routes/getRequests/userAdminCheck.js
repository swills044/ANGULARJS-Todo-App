//''''''''''''''''''
//Checks if the user is an admin or not
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var mongoose = require('mongoose');
var UserProjects = require('../models/UserProjects').model;

module.exports = function(app) {

    app.get('/adminCheck', passport.authenticate('bearer', {
        session: false
      }), function(req, res) {
        //Query for searching database
        var query = {
            User: req.query.userid,
            Project: req.query.id
        }
        //Search UserProjects collection
        UserProjects.findOne(query, function(err, data) {
            if (err) {
                res.status(400).send(err)
            }
            if (data == null) {
                res.status(400).send('Data is null');
            } else {
                if (data.Type == 'admin') {
                    if (data.Type == null) {
                        console.log('null');
                    }
                    res.status(200).send('admin');
                } else if (data.Type == 'worker') {
                    res.status(200).send('worker');
                };
            }
        })
    })

};

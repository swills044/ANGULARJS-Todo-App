//''''''''''''''''''
//Find the selected project
//''''''''''''''''''

//Dependencies required
var crypto = require('crypto');
var mongoose = require('mongoose');
var Project = require('../models/Project').model;
var passport = require('passport');


module.exports = function(app) {

  app.get('/api/project/:_id', passport.authenticate('bearer', {
      session: false
    }), function(req, res, next) {
      //Query for searching
      var query = {
        _id: req.params._id
      }
      //Project is found and the data is sent
      Project.findOne(query, function(err, data){
        if (err) {
          res.status(400).send(err);
        }else {
          res.status(200).send(data);
          console.log(data)
        }

      })
    })

};

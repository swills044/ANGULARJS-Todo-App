//''''''''''''''''''
//register
//''''''''''''''''''

//Dependencies
var passport = require('passport');
var crypto = require('crypto');
var mongoose = require('mongoose');
var User = require('../models/User').model;

module.exports = function(app) {
    //Register
    app.post('/register', function(req, res) {

        //Check for username or password.
        if (!req.body.UserName || !req.body.Password)
            return res.status(400).json({
                error: "Bad Request"
            });
        //Find a user by the username
        var query = {
            UserName: req.body.UserName
        };

        User.findOne(query, function(err, user) {
            if (err)
                return res.status(500).json({
                    error: 'An Error Occured'
                });
            if (user)
                res.status(500).send('User Taken');
            else
                createNewUser();
        });
        //Create a user with the data parsed
        function createNewUser() {

            var newUser = new User(req.body);
            newUser.Password = newUser.EncryptPassword(req.body.Password);
            newUser.save(function(err) {
                if (err)
                    return res.status(500).send('User Taken')


                res.status(200).json(newUser);
            });

        }
    });
};

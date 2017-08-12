var crypto = require('crypto');
var mongoose = require('mongoose');
var User = require('../models/User').model;
var AccessToken = require('../models/AccessToken').model;
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var UserLogin = require('../models/UserLogin').model;
var UserProjects = require('../models/UserProjects').model;
var project =  require('../models/Project').model;
var Task = require('../models/Task').model;
var path = require('path');

module.exports = function(app){
	//Register
	app.post('/register', function( req, res ){

        //Check for username or password.
		if (!req.body.UserName || !req.body.Password)
	            return res.status(400).json({
	                error: "Bad Request"
	    });
        //Find a user by the username
	    var query = {
	        UserName: req.body.UserName
	    };

	    User.findOne(query, function (err, user) {
	            if (err)
	                return res.status(500).json({
	                    error: 'An Error Occured'
	                });
	            if (user)
	                return res.status(409).json({
	                    error: 'User Already Exists'
	                });
	            else
	                createNewUser();
	    });
        //Create a user with the data parsed
	    function createNewUser() {

	    	var newUser = new User(req.body);
            newUser.Password = newUser.EncryptPassword(req.body.Password);
            newUser.save(function (err) {
                if (err)
                        return res.status(500).json({
                            error: err
                        })


            res.status(200).json(newUser);
            });

	    }
	});
	//Login
	app.post('/login', function(req,res){
        //Check for UserName and Pasword
		if (!req.body.UserName || !req.body.Password) {
            res.status(400).json({
                error: "Bad Request"
            });
        }
        //Find User by UserName
        var query = {
            UserName: req.body.UserName
        };
        User.findOne(query, function (err, user) {
            //if there is a error log it to UserLogin
           if (err) {
                try {
                    var _userLogin = new UserLogin();
                    _userLogin.UserName = req.body.UserName;
                    _userLogin.UserIP = req.ip;
                    _userLogin.Status = "API_ERROR";
                    _userLogin.save(function (err) {
                        if (err) {
                            res.status(500).send(err);
                        } else {

                        }
                    });
                } catch (e) {
                    console.log(e);
                }
                return res.status(500).json({
                    error: 'An Error Occured.'
                })
            }
            if (!user) {res.status(500).send('No user')};
            //If a User exists then validate password and create a new token
            if (user) {
                if (user.ValidatePassword(req.body.Password, user.Password)) {
                        
                               var accesstoken = new AccessToken({
                                        UserId: user._id,
                                        TokenString: crypto.randomBytes(32).toString('hex'),
                                        UserName: user.UserName,
                                        //Owner: user.Owner,
                                        //Claims: claimsValue
                                    });

                               accesstoken.save(function (err) {
                                    var UserId = user._id;
                                    AccessToken.findByIdAndRemove(UserId, function(err, user){
                                        if (err) {res.send(err);}
                                        
                                            else {
                                                try {
                                                    var _userLogin = new UserLogin();
                                                    _userLogin.UserName = req.body.UserName;
                                                    _userLogin.UserIP = req.ip;
                                                    _userLogin.Status = "SUCCESS"
                                                    _userLogin.save(function (err) {
                                                        if (err) {
                                                            return res.status(500).json({
                                                                error: 'An Error Occured during Token Generation.'
                                                            });
                                                        } else {
                                                            res.status(200).json(accesstoken);
                                                        }
                                                    });
                                                } catch (e) {
                                                    console.log(e);
                                                }
                                            }
                                    })
                                    
                                }); 
                            
                        };


            }


        	
            });                                          
	}); 
    //Link User
    app.post('/api/project/linkuser', function(req, res){

        var query = {
            Project: req.body.Project,

        }
        //Search for project
        UserProjects.findOne(query, function (err, project){ 

                if (err) {
                    res.status(500).send(err);
                }

                if (!project) {
                    res.status(500).send('No project found')
                }

                if (project) {

                    var query2 = {
                        User: req.body.User
                    }
                    //Check for projects with the same user
                    UserProjects.count(query2, function(err, count){

                        if (count>0) {

                             res.status(500).send('User Already In project!');

                        } else {

                            var data = new UserProjects();
                                data.User = req.body.User;
                                data.Project = req.body.Project;

                                data.save(function(err, data){
                          
                                    if (err) {

                                        res.status(500).send(err);

                                    } else {

                                        res.status(200).send(data);

                                    }
                                    

                                })

                        }

                    })

                }
            

        }); 
    });
    //Unlink User
    app.post('/api/project/unlinkuser', function(req, res){

            var query = {
                Project: req.body.Project,
                User: req.body.User
            }

                //Find the project entry and remove it
                UserProjects.findOneAndRemove(query, function(err, user){

                    if (err) {
                        res.status(500).send(user);
                    }
                    res.status(200).send(user);

                })        
    });
    //Add project
    app.post('/api/projects', passport.authenticate('bearer', {session: false}), function(req, res){

            var data = new project(req.body);
        
            //Add a project and a userproject
            data.CreatedById = req.user._id;
            
            data.save(function(err){
                if (err)
                    res.status(500).send(err);
                else {
                    
                    var query = {
                        User: req.user._id,
                        Project: data._id
                    }

                    UserProjects.count(query, function(err, count){

                        if (err) {
                            res.status(500).send(err);
                        }

                        if (count>0) {
                            res.status(500).send('User is already in this project');
                        }
                        else{

                            var UserProject = new UserProjects();
                            UserProject.Project = data._id;
                            UserProject.User = req.user._id;

                            UserProject.save(function(err){

                                if (err) {
                                    res.status(500).send(err);
                                }
                                res.status(200).json(UserProject);

                            })

                        }

                    })

                }


            })
    });
    //Logout
    app.post('/logout', passport.authenticate('bearer', {session: false}), function(req, res){

        var query = {
            UserId: req.user._id
        }

        AccessToken.findOneAndRemove(query, function(err, token){

            if (err) {
                res.status(500).send(err);
            }   else {
                res.redirect('/');
            }

        })
    });
    //GetTaskByUserid
    app.get('/usertasks', passport.authenticate('bearer', {session: false}), function(req, res){

        query = {
            CreatedById: req.user.id
        }
        Task.find(query, function(err, task){
            res.send(task)
            if (err) {
                res.status(400).send(err);
            } else {
                //res.status(200).send(task);
            }


        })


    });

};

 
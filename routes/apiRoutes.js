var controllerBuilder = require('../controllers/baseController.js');
var mongoose = require('mongoose');
var BearerStrategy = require('passport-http-bearer').Strategy;
var passport = require('passport');
module.exports = function(app, models) {

	for (var key in models) {
		if (models.hasOwnProperty(key)) {
			var controller = controllerBuilder(models[key]);

			app.get('/api/'+ key, passport.authenticate('bearer', {
                session: false
            }), controller.get);
			app.get('/api/'+ key + '/:_id', passport.authenticate('bearer', {
                session: false
            }), controller.getOneById);
			app.put('/api/'+ key + '/:_id', passport.authenticate('bearer', {
                session: false
            }), controller.put);
			app.post('/api/'+ key, passport.authenticate('bearer', {
                session: false
            }), controller.post);
			app.delete('/api/'+ key + '/:_id', passport.authenticate('bearer', {
                session: false
            }), controller.delete);
		}
	}

}
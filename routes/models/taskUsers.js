//''''''''''''''''''
//Link users to task model for linking users
//''''''''''''''''''

//Dependencies
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var name = 'taskUser';

var taskUsersSchema = new mongoose.Schema({
	Task: {
		type: Schema.Types.ObjectId,
	},
	User: {
		type: Schema.Types.ObjectId
	}
});

var model = mongoose.model(name, taskUsersSchema);

module.exports = {
	name: name,
	model: model,
	schema: taskUsersSchema
}

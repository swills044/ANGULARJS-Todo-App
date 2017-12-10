//''''''''''''''''''
//Linked users to a project model
//''''''''''''''''''

//Dependencies
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var name = 'userProject';

var userprojectsSchema = new mongoose.Schema({
	Project: {
		type: Schema.Types.ObjectId,
	},
	User: {
		type: Schema.Types.ObjectId
	},
	Type: {
		type: String, enum:['admin', 'worker'],
		default: 'admin'
	}

});

var model = mongoose.model(name, userprojectsSchema);

module.exports = {
	name: name,
	model: model,
	schema: userprojectsSchema
}

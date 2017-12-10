//''''''''''''''''''
//Project model for displaying project data
//''''''''''''''''''

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var name = 'project';

var projectSchema = new mongoose.Schema({
	Name: {
		type: String,
		required: true,
	},
	CreatedById: {
		type: Schema.Types.ObjectId
	},
	Status: {
		type: String, enum:['NEW', 'INPROGRESS', 'COMPLETED'],
		default: "NEW"
	},
	Description:{
		type: String
	}


});

var model = mongoose.model(name, projectSchema);

module.exports = {
	name: name,
	model: model,
	schema: projectSchema
}

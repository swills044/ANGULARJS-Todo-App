var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var name = 'task';
var taskSchema = new mongoose.Schema({
	Name: {
		type: String,
		required: true
	},
	Project: {
		type:Schema.Types.ObjectId,
		default: null
	},
	ProjectName: {
		type: String
	},
	CreatedById: {
		type: Schema.Types.ObjectId, required: true
	},
	Status: {
		type: String, enum: ['NEW', 'INPROGRESS', 'COMPLETED']
	},
	DueDate: {
		type : Date, default: Date.now
	}


});

var model = mongoose.model(name, taskSchema);

module.exports = {
	name: name,
	model: model,
	schema: taskSchema
}

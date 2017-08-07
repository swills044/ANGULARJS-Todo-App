var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var name = 'userProject';


var userprojectsSchema = new mongoose.Schema({
	Project: {
		type: Schema.Types.ObjectId, 
	},
	User: {
		type: Schema.Types.ObjectId
	}
	
});

var model = mongoose.model(name, userprojectsSchema);

module.exports = {
	name: name,
	model: model,
	schema: userprojectsSchema
}
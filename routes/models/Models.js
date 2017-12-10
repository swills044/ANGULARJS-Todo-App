//''''''''''''''''''
//This creates an easy link from the server.js file
//''''''''''''''''''

module.exports = function(mongoose) {
	return {
		task: require('./Task'),
		UserProjects: require('./UserProjects'),
		user: require('./User'),
		accessToken: require('./AccessToken'),
		project: require('./Project'),
		taskUsers: require('./taskUsers')
	}
}

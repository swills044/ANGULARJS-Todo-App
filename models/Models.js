module.exports = function(mongoose) {
	return {
		project: require('./Project'),
		task: require('./Task'),
		userProjects: require('./UserProjects'),
		user: require('./User'),
		accessToken: require('./AccessToken')
	}
}


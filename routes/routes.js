//''''''''''''''''''
//Easy link to server js, serves as routes hub
//''''''''''''''''''

module.exports = function(app) {
	return {
		addProject: require('./postRequests/addProject.js')(app),
    linkProjectUser: require('./postRequests/linkProjectUser.js')(app),
    linktaskUser: require('./postRequests/linktaskUser.js')(app),
    login: require('./postRequests/login.js')(app),
    logout: require('./postRequests/logout.js')(app),
    notInProject: require('./getRequests/notInProject.js')(app),
    projectsTasks: require('./getRequests/projectsTasks.js')(app),
    register: require('./postRequests/register.js')(app),
    removeProject: require('./deleteRequests/removeProject.js')(app),
    taskUsers: require('./getRequests/tasksUsers')(app),
    unlinkProjectUser: require('./postRequests/unlinkProjectUser.js')(app),
    unlinktaskUser: require('./postRequests/unlinktaskUser.js')(app),
    userAdminCheck: require('./getRequests/userAdminCheck.js')(app),
    usersProjects: require('./getRequests/usersProjects.js')(app),
    usersTasks: require('./getRequests/usersTasks.js')(app),
    usersTasksThisWeek: require('./getRequests/usersTasksThisWeek.js')(app),
		usersTasksToday: require('./getRequests/usersTasksToday.js')(app),
		projectUsers: require('./getRequests/projectUsers.js')(app),
		userProject: require('./getRequests/userProject.js')(app),
		loggedIn: require('./getRequests/LoggedIn.js')(app),
		addTask: require('./postRequests/newTask.js')(app),
		deleteTask: require('./deleteRequests/deleteTask.js')(app)

	}
}

(function(angular) {
				var module = angular.module('todoApp', [
								'ui.router',
								//'topbar.controller'
				]);
				module.config(config);
				config.$inject = ['$stateProvider', '$urlRouterProvider'];

				function config($stateProvider, $urlRouterProvider) {
								$urlRouterProvider.otherwise('/inbox');
								$urlRouterProvider.when('', '/inbox');
								$stateProvider.state('root', {
												url: '',
												abstract: true,
												views: {
																'topbar': {
																				templateUrl: './layout/topbar/topbar.partial.html'
																},
																'sidebar-left': {
																				templateUrl: './layout/sidebar-left/sidebar-left.partial.html',
																				controller: 'sidebarleftcontroller'
																}
												}

								})

				}



}(angular));

/*


/*
    Get All the tasks for that user through every project
    Needs development of an API to pull all tasks for a user. 
*/

//state creation - /agenda?period = today/week 

//state creation - /project = project-name

/*
    You will have just one partial and one controller

    1. Your controller needs to be able to display tasks and a heading for the tasks. In case of an agenda it will show "This Week" and the tasks for this week. In case of a project it will show project name and tasks inside the project
    2. Magic is in the resolve 
        Ever state will resolve data before the state is loaded. and pass the data on to the controller in a way where controller can display the data. Simply - state is responsibe; for pulling the right data and controller is responsibel for showing the data in the right way.
*

*/

(function(angular){

	var module = angular.module('todoApp', [

			//'taskService',
			'ui.router',
			//'topbar.controller'

		]);

	module.config(config);



	config.$inject = ['$stateProvider','$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise('/');

		$stateProvider

			.state('index', {

				url: '/',
				views: {

					'topbar': {

						templateUrl: './layout/topbar/topbar.partial.html'
						//controller: 'topbar.controller'

					},
					'sidebar-left': {

						templateUrl: './layout/sidebar-left/sidebar-left.partial.html',
						controller: 'getController'

					},
					'sidebar-right': {

						templateUrl: './layout/sidebar-right/sidebar-right.partial.html'	

					}

				}

			})
			.state('projects', {

				url: '/{id}',
				templateUrl: './views/project/project-view.html',
				controller: 'getByIdController',
				resolve: {

					project: ['$stateParams', 'projectService', 
						function($stateParams, projectService){
							return projectService.getById()
							.then(function(project){
								return project[$stateParams.id]; 
							});

					}]

				}

			})

	}



}(angular))
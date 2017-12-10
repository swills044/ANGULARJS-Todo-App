(function(angular){

	var module = angular.module('todoApp');

	module.controller('sidebarleftcontroller', controller);
	controller.$inject = ['$window', '$scope', '$http', '$state', 'rProjects', '$uibModal', 'user'];

	function controller($window, $scope, $http, $state, rProjects, $uibModal, user){
		//Variables
		$scope.projects = rProjects;
		$scope.user = user;
		
		//Filters
		$scope.today = function () {
			$state.go('root.agendatoday', {period: 'today'});
		};
		$scope.week = function () {
			$state.go('root.agendaweek', {period: 'week'});
		};
		$scope.inbox = function (){
			$state.go('root.tasks', {});
		}

		$scope.projectpage = function(id){
			$state.go('root.project', {id: id});
		}

		//Modals

		$scope.openAddTaskModal = function openAddTaskModal() {
				var modalInstance = $uibModal.open({
						//path of the modal template
						templateUrl: './templates/addTaskTemplate.html',
						//modal controller
						controller: ['$scope', '$uibModalInstance',
								function($scope, $uibModalInstance) {
										$scope.projects = rProjects;

										$scope.user = {};

										$scope.newTask = function() {
												modalInstance.close()
												swal(
														'Task Added!',
														'You added ' + $scope.name,
														'success'
												)
												if ($scope.user.selected == undefined) {
														$scope.user.selected = null;
														$scope.user.selected = {
																_id: null
														};
														var data = {
																Name: $scope.name,
																Project: $scope.user.selected._id,
																ProjectName: $scope.user.selected.Name,
																DueDate: $scope.duedate,
																Description: $scope.desc
														};
														var config = {
																headers: {
																		"Authorization": "Bearer " + localStorage.getItem("tokenString")
																}
														}
														$http.post(window.endpoint + "api/task", data, config)
																.then(function() {
																		$state.reload();
																})
												} else {
														var data = {
																Name: $scope.name,
																Project: $scope.user.selected._id,
																ProjectName: $scope.user.selected.Name,
																DueDate: $scope.duedate,
																Description: $scope.desc
														};
														var config = {
																headers: {
																		"Authorization": "Bearer " + localStorage.getItem("tokenString")
																}
														}
														$http.post(window.endpoint + "api/task", data, config)
																.then(function() {
																		$state.reload();
																})
												}

										}

								}
						]
				});
		}

		$scope.openAddProjectModal = function openAddProjectModal() {
			var modalInstance = $uibModal.open({
				//path of the modal template
				templateUrl: './templates/addProjectTemplate.html',
				//modal controller
				controller: ['$scope', '$uibModalInstance',
				function($scope, $uibModalInstance) {
					$scope.newProject = function(){
						swal(
							'Project Added!',
							'You added ' + $scope.name,
							'success'
						)
						var data = {Name: $scope.name, Description: $scope.desc};
						var config = {
							headers : {
								'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
							}
						}
						$http.post(window.endpoint +'api/projects', data, config)
						.then(function(){
							$state.reload();
							modalInstance.close()
						})
					}
				}
			]
		});
		}


}

}(angular))

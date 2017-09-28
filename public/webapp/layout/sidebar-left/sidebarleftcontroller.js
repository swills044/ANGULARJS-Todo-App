(function(angular){

	var module = angular.module('todoApp');

	module.controller('sidebarleftcontroller', controller);
	controller.$inject = ['$window', '$scope', '$http', '$state', 'rProjects', '$uibModal'];

	function controller($window, $scope, $http, $state, rProjects, $uibModal){
		$scope.projects = rProjects;

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

		$scope.openAddProjectModal = function openAddProjectModal() {
				var modalInstance = $uibModal.open({
						//path of the modal template
						templateUrl: './templates/addProjectTemplate.html',
						//modal controller
						controller: ['$scope', '$uibModalInstance',
								function($scope, $uibModalInstance) {
									$scope.newProject = function(){
										var data = {Name: $scope.name};

										var config = {
														headers : {
																'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
														}
												}
										$http.post(window.endpoint +'api/projects', data, config)
										.then(function(){
											$state.reload();

										})
									}
									$('.open-datetimepicker').click(function(event){
									    event.preventDefault();
									    $('#datepicker').focus();
									});

									$(function () {
										$( "#datepicker" ).datepicker({
											changeMonth: true,//this option for allowing user to select month
											changeYear: true //this option for allowing user to select from year range
										});
									})




								}
						]
				});
		}



		$scope.delete = function(id){

			var config = {
	            headers : {
	                'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
	            }
	        }

			$http.delete(window.endpoint + 'userproject/' + id, config)
			.then(function(){
				$state.reload();
			})
		}


	}

}(angular))

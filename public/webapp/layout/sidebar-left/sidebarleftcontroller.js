(function(angular){

	var module = angular.module('todoApp');

	module.controller('sidebarleftcontroller', controller);
	controller.$inject = ['$window', '$scope', '$http', '$state', 'rProjects', '$uibModal'];

	function controller($window, $scope, $http, $state, rProjects, $uibModal){
		//Variables
		$scope.projects = rProjects;

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
						var data = {Name: $scope.name};

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

		//Style functions

		//Add project hover
		$( "#test" ).hover(function() {
			$("#add").show(200);
		})

		$( "#test" ).mouseout(function() {
			setTimeout(function(){  $("#add").hide(200);}, 2000);

		})
		//.


}

}(angular))

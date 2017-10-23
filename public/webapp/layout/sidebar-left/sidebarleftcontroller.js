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



		$scope.delete = function(id){
			swal({
			  title: 'Are you sure?',
			  text: "You won't be able to revert this!",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes, delete it!'
			}).then(function () {
				var config = {
		            headers : {
		                'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
		            }
		        }

			  swal(
			    'Deleted!',
			    'Your file has been deleted.',
			    'success'
			  )

				$http.delete(window.endpoint + 'userproject/' + id, config)
				.then(function(){
					$state.go('root.tasks', {});
					$state.reload()
				})
			})
		}


	}

}(angular))

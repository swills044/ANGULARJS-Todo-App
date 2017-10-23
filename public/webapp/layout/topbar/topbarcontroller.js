(function(angular){

	var module = angular.module('todoApp');

	module.controller('topbarcontroller', controller);
	controller.$inject = ['$window', '$scope', '$http', '$state', 'rProjects', 'rTasks', 'user', '$uibModal'];

	function controller($window, $scope, $http, $state, rProjects, rTasks, user, $uibModal){
		$scope.projects = rProjects;
		$scope.project = {};
		$scope.user = user;
		$scope.tasks = rTasks;
		$scope.task = {};

		$scope.stateFind = function(item, model){
			$state.go('root.project', {id: item._id});
		}

		// if (annyang) {
		// 	var commands = {};
		// 	rProjects.forEach(function(p){
		// 		var name = p.Name;
		// 		commands.name = function(){
		// 			console.log('ppopopopopo');
		// 		}
		// 	})
		// 	// Add our commands to annyang
		// 	annyang.addCommands(commands);
		//
		// 	// Start listening. You can call this here, or attach this call to an event, button, etc.
		// 	annyang.start();
		// }

		$scope.logout = function(){

			swal({
			  title: 'Are you sure?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes, logout!'
			}).then(function () {
				var data = $.param({});
				var config = {
					headers : {
						'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
					}
				}


			  swal(
			    'Logging out!',
			    'You being logged out.',
			    'success'
			  )


				$http.post(window.endpoint +'logout', data, config)
				.then(function(){
					localStorage.removeItem('tokenString');
					$window.location.href = '/index.html';
				})
			})

		}

		$scope.openTaskModal = function openTaskModal(){
			var modalInstance = $uibModal.open({
				//path of the modal template
				templateUrl: './templates/addTaskTemplate.html',
				//modal controller
				controller: ['$scope', '$uibModalInstance',
				function($scope, $uibModalInstance) {
					$scope.projects = rProjects;
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

					$scope.user = {};

					$scope.newTask = function(){
						modalInstance.close()
						swal(
							'Task Added!',
							'You added ' + $scope.name,
							'success'
						)
						if ($scope.user.selected == undefined) {
              $scope.user.selected = null;
              $scope.user.selected = {_id: null};
              var data = {Name: $scope.name, Project: $scope.user.selected._id , ProjectName: $scope.user.selected.Name, DueDate: $scope.duedate};
              var config = {
                headers : {
                  "Authorization": "Bearer " + localStorage.getItem("tokenString")
                }
              }
              $http.post(window.endpoint +"api/task", data, config)
              .then(function(){
                $state.reload();
              })
            }else {
              var data = {Name: $scope.name, Project: $scope.user.selected._id , ProjectName: $scope.user.selected.Name, DueDate: $scope.duedate};
              var config = {
                headers : {
                  "Authorization": "Bearer " + localStorage.getItem("tokenString")
                }
              }
              $http.post(window.endpoint +"api/task", data, config)
              .then(function(){
                $state.reload();
              })
            }
					}

				}
			]
		});
		}





	}

}(angular));

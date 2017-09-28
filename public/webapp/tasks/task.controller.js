(function(angular) {
    var module = angular.module("todoApp");

    module.controller("TaskController", taskController);

    taskController.$inject = ["$scope", "rTasks", "rHeading", "$http", "$window", "rProjects", "$state", "$uibModal"];

    function taskController($scope, rTasks, rHeading, $http, $window, rProjects, $state, $uibModal) {
        $scope.heading = rHeading;
        $scope.tasks = rTasks;
        $scope.projects = rProjects;
        $scope.openAddTaskModal = function openAddTaskModal() {
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

                        $scope.newTask = function(){
                  			var data = {Name: $scope.name, Project: $scope.project._id , ProjectName: $scope.project.Name, DueDate: $scope.duedate};
                        console.log(data)
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
                ]
            });
        }


		$scope.delete = function(id){

			var config = {
	            headers : {
	                "Authorization": "Bearer " + localStorage.getItem("tokenString")
	            }
	        }

			$http.delete(window.endpoint + "api/task/" + id, config)
			.then(function(){
				$state.reload();
			})
		}



    }
}(angular));

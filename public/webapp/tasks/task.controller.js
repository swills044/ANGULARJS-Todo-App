(function(angular) {
    var module = angular.module('todoApp');

    module.controller('TaskController', taskController);

    taskController.$inject = ['$scope', 'rTasks', 'rHeading', '$http', '$window', 'rProjects'];

    function taskController($scope, rTasks, rHeading, $http, $window, rProjects) {
        $scope.heading = rHeading;
        $scope.tasks = rTasks;   
        $scope.projects = rProjects 

        $scope.showForm = function(){
        	$('#addtask').removeClass('hide')
        }

	    $scope.newTask = function(){
			var data = {Name: $scope.Name, Project: $scope.Project ,DueDate: $scope.DueDate};
			console.log(data);
			var config = {
	            headers : {
	                'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
	            }
	        }
			$http.post(window.endpoint +'api/task', data, config)
			.then(function(){
				location.reload();
				
			})
		}

		$scope.delete = function(id){

			var config = {
	            headers : {
	                'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
	            }
	        }

			$http.delete(window.endpoint + 'api/task/' + id, config)
			.then(function(){
				location.reload();
			})
		}  

		                                       
        
    }
}(angular));

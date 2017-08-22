(function(angular) {
    var module = angular.module('todoApp');

    module.controller('projectController', projectController);

    projectController.$inject = ['$scope','$http', '$window', 'project', 'tasks', 'users'];

    function projectController($scope, $http, $window, project, tasks, users) {
        $scope.project = project;   
        $scope.tasks = tasks;
        $scope.users = users;

        
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
		var username = $scope.username;
		$scope.linkuser = function(id){
			var data = {Project: id, User: username};
			console.log(data);
			var config = {
	            headers : {
	                'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
	            }
	        }
			$http.post(window.endpoint +'api/project/linkuser', data, config)
			.then(function(){
				location.reload();
				
			})

		}

		                                       
        
    }
}(angular));

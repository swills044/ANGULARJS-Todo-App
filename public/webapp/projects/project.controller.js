(function(angular) {
    var module = angular.module('todoApp');

    module.controller('projectController', projectController);

    projectController.$inject = ['$scope','$http', '$window', 'project', 'tasks'];

    function projectController($scope, $http, $window, project, tasks) {
        $scope.project = project;   
        $scope.tasks = tasks;

        
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

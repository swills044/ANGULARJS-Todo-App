(function(angular){

	var module = angular.module('todoApp');

	module.service('taskService', taskService);
	taskService.$inject = ['$http'];
	function taskService($http){
		var service = {};
	
		//UserTasks
			service.usertasks = function($scope){
	
				return $http({
	
					method:"GET",
					url: window.endpoint + 'usertasks',
					headers: {'Authorization': 'Bearer ' + localStorage.getItem("tokenString")}
				});
	
			}
		//UserTasks today
			service.usertaskstoday = function($scope){
	
				return $http({
	
					method:"GET",
					url: window.endpoint + 'tasktoday',
					headers: {'Authorization': 'Bearer ' + localStorage.getItem("tokenString")}
				});
	
			}
		//UserTasks week
			service.usertasksweek = function($scope){
	
				return $http({
	
					method:"GET",
					url: window.endpoint + 'taskweek',
					headers: {'Authorization': 'Bearer ' + localStorage.getItem("tokenString")}
				});
	
			}
	
	
	
		return service;
	}

}(angular))
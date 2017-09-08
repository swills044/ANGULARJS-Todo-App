(function(angular){

	var module = angular.module('todoApp');

	module.service('userService', userService);
	userService.$inject = ['$http'];
	function userService($http){
		var service = {};
	
		//UserTasks
			service.users = function($scope){
	
				return $http({
	
					method:"GET",
					url: window.endpoint + 'users',
					headers: {'Authorization': 'Bearer ' + localStorage.getItem("tokenString")}
				});
	
			}
		
		return service;
	}

}(angular))
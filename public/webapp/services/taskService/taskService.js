(function(angular){

	var module = angular.module('taskService');

	module.service(service);

	var service = {};
	//Get
		service.get = function($scope, $http){

			$http({
		        method : "GET",
		        url : end + '/api/task',
		        headers: {'Authorization': 'Bearer' + localStorage.getItem("tokenString")}
		    }).then(function mySuccess(response) {
		        $scope.task = response.data;
		    }, function myError(response) {
		        $scope.error = response.statusText;
		    });

		};
	//Post
		service.post = function($scope, $http){

			$http({
		        method : "POST",
		        url : end + '/api/task/:id',
		        headers: {'Authorization': 'Bearer' + localStorage.getItem("tokenString")}
		    }).then(function mySuccess(response) {
		        $scope.task = response.data;
		    }, function myError(response) {
		        $scope.error = response.statusText;
		    });
		    
		};
	//Put
		service.put = function($scope, $http){

			$http({
		        method : "PUT",
		        url : end + '/api/task/:id',
		        headers: {'Authorization': 'Bearer' + localStorage.getItem("tokenString")}
		    }).then(function mySuccess(response) {
		        $scope.task = response.data;
		    }, function myError(response) {
		        $scope.error = response.statusText;
		    });

		};
	//GetById
		service.getById = function($scope, $http){

			$http({
		        method : "GET",
		        url : end + '/api/task/:id',
		        headers: {'Authorization': 'Bearer' + localStorage.getItem("tokenString")}
		    }).then(function mySuccess(response) {
		        $scope.task = response.data;
		    }, function myError(response) {
		        $scope.error = response.statusText;
		    });

		}



	return service;

}(angular))
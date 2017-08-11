(function(angular){

	var module = angular.module('todoApp');

	module.service('projectService', projectService);
	projectService.$inject = [ '$http']
	function projectService($http){
	var service = {};
	//Get
		service.get = function(){
			return $http({
		        method : "GET",
		        url : end + 'api/project',
		        headers: {'Authorization': 'Bearer ' + localStorage.getItem("tokenString")}
		    });

		    

		};
	//Post
		service.post = function(){

			 return $http({
		        method : "POST",
		        url : end + 'api/projects/:_id',
		        headers: {'Authorization': 'Bearer' + localStorage.getItem("tokenString")}
		    });

		};
	//Put
		service.put = function($scope, $http){

			return $http({
		        method : "PUT",
		        url : end + 'api/projects/:_id',
		        headers: {'Authorization': 'Bearer' + localStorage.getItem("tokenString")}
		    });

		};
	//GetById
		service.getById = function(){

			return $http({
		        method : "GET",
		        url : end + 'api/projects/:_id',
		        headers: {'Authorization': 'Bearer' + localStorage.getItem("tokenString")}
		    });

		}



	return service;
}

}(angular))
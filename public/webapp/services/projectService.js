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
		        url : window.endpoint + 'api/project',
		        headers: {'Authorization': 'Bearer ' + localStorage.getItem("tokenString")}
		    });

		};
	//GetById
		service.getById = function(id){
			return $http({
				method: "GET",
				url: window.endpoint + 'api/project/' + id.id,
				headers: {'Authorization': 'Bearer ' + localStorage.getItem("tokenString")}
			})
		}
	//Project tasks
		service.getTaskByProjectId = function(id){
			return $http({
				method: "GET",
				url: window.endpoint + 'api/project_tasks/' + id.id,
				headers: {'Authorization': 'Bearer ' + localStorage.getItem("tokenString")}
			})
		}
	//User projects
		service.userprojects = function(id){
			return $http({
				method: 'GET',
				url: window.endpoint + 'userprojects/' + id.id,
				headers: {'Authorization': 'Bearer ' + localStorage.getItem("tokenString")}

			})
		}
	//Edit
		service.editproject = function(id, body){
			return $http({
				method: 'GET',
				url: window.endpoint + 'project/' + id.id,
				data: {'Status': body},
				headers: {'Authorization': 'Bearer ' + localStorage.getItem("tokenString")}

			})
		}

	return service;
}

}(angular))

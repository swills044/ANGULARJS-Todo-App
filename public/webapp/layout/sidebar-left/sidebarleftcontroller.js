(function(angular){

	var module = angular.module('todoApp');

	module.controller('sidebarleftcontroller', controller);
	controller.$inject = ['$window', '$scope', '$http', '$state', 'rProjects'];

	function controller($window, $scope, $http, $state, rProjects){
		$scope.projects = rProjects;
		
		$scope.today = function () {
		    $state.go('root.agendatoday', {period: 'today'});
		};
		$scope.week = function () {
		    $state.go('root.agendaweek', {period: 'week'});
		};
		$scope.inbox = function (){
			$state.go('root.tasks', {});
		}

		$scope.projectpage = function(id){
			
			$state.go('root.project', {id: id});
		}  

		$scope.delete = function(id){

			var config = {
	            headers : {
	                'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
	            }
	        }

			$http.delete(window.endpoint + 'api/project/' + id, config)
			.then(function(){
				location.reload();
			})
		} 

		$scope.newProject = function(){
			var data = {Name: $scope.Name};

			var config = {
	            headers : {
	                'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
	            }
	        }
			$http.post(window.endpoint +'api/projects', data, config)
			.then(function(){
				location.reload();
				
			})
		}     
	}

}(angular))
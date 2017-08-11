(function(angular){

	var module = angular.module('todoApp');

	module.controller('getController', get);
	module.controller('getByIdController', getById);

	module.$inject = ['$scope', 'projectService', 'project', '$stateParams'];

	function get($scope, projectService){
			
		
		projectService.get().then(function(res){

			$scope.project = res.data;
			
		}, 
			function(err){
	
		})

	};

	function getById(project, $stateParams, $scope){

		

	}


}(angular))
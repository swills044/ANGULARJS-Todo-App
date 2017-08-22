(function(angular){

	var module = angular.module('todoApp');

	module.controller('topbarcontroller', controller);
	controller.$inject = ['$window', '$scope', '$http', '$state'];

	function controller($window, $scope, $http, $state){

		$scope.logout = function(){
			var data = $.param({   
            });
			var config = {
                headers : {
                    'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
                }
            }
			$http.post(window.endpoint +'logout', data, config)
			.then(function(){
				localStorage.removeItem('tokenString');
				$window.location.href = '/index.html';
			})
		}

		


	}

}(angular));
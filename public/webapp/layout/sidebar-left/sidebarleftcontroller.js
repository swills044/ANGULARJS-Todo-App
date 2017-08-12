(function(angular){

	var module = angular.module('todoApp');

	module.controller('sidebarleftcontroller', controller);
	controller.$inject = ['$window', '$scope', '$http'];

	function controller($window, $scope, $http){

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

}(angular))
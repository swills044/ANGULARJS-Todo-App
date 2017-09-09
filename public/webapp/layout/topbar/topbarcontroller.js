(function(angular){

	var module = angular.module('todoApp');

	module.controller('topbarcontroller', controller);
	controller.$inject = ['$window', '$scope', '$http', '$state', 'rProjects', 'rTasks'];

	function controller($window, $scope, $http, $state, rProjects, rTasks){
		$scope.projects = rProjects;
		$scope.project = {};

		$scope.tasks = rTasks;
		$scope.task = {};

		$scope.stateFind = function(item, model){
			$state.go('root.project', {id: item._id});
		}

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
		$scope.newTask = function(){
			var data = {Name: $scope.name, Project: $scope.project._id ,DueDate: $scope.duedate};
			console.log(data);
			var config = {
	            headers : {
	                "Authorization": "Bearer " + localStorage.getItem("tokenString")
	            }
	        }
			$http.post(window.endpoint +"api/task", data, config)
			.then(function(){
				$state.reload();

			})
		}
		$scope.form = false;
        $scope.showform = function(){
        	if ($scope.form == true) {
        		$scope.form = false
        	}else{
        		$scope.form = true;
        	}

        }

        $('.open-datetimepicker').click(function(event){
		    event.preventDefault();
		    $('#datepicker').focus();
		});

		$(function () {
			$( "#datepicker" ).datepicker({
				changeMonth: true,//this option for allowing user to select month
				changeYear: true //this option for allowing user to select from year range
			});
		})




	}

}(angular));

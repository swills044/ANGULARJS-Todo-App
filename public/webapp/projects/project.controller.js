(function(angular) {
    var module = angular.module('todoApp');

    module.controller('projectController', projectController);


    projectController.$inject = ['$scope','$http', '$window', 'project', 'tasks',  'projectusers', 'users', '$state', 'projectService'];

    function projectController($scope, $http, $window, project, tasks, projectusers, users, $state, projectService) {
        $scope.localid = localStorage.getItem('UserId')
        $scope.project = project;
        $scope.tasks = tasks;
        $scope.projectusers = projectusers;
        var newUsers = [];
        var localid = localStorage.getItem('UserId')
        users.forEach(function(u){
          if (u._id != localid){
            debugger;
            newUsers.push(u);
            console.log(u)
          }
        });
        $scope.users = newUsers;
        $scope.user = {};

        $scope.editStatus = function(id, body){
          projectService.editproject(id, body);
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

		$scope.delete = function(id){
			var config = {
	            headers : {
	                'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
	            }
	        }

			$http.delete(window.endpoint + 'api/task/' + id, config)
			.then(function(){
				$state.reload();
			})
		}
		$scope.linkuser = function(id){
			var data = {Project: id, User: $scope.user._id};
			var config = {
	            headers : {
	                'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
	            }
	        }
			$http.post(window.endpoint +'api/project/linkuser', data, config)
			.then(function(){
				$state.reload();

			})

		}
		$scope.unlinkuser = function(id, userid){
			var data = {Project: id, User: userid};
			console.log(data);
			var config = {
	            headers : {
	                'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
	            }
	        }
			$http.post(window.endpoint +'api/project/unlinkuser', data, config)
			.then(function(){
				$state.reload();

			})
		}
    }




}(angular));

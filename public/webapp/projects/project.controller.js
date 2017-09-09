(function(angular) {
    var module = angular.module('todoApp');

    module.controller('projectController', projectController);
    module.filter("filterArrayByBlacklist", filter);

    function filter($stateParams) {
      var localid = localStorage.getItem('UserId')
      var blackList = localid;
      return function(array) {
          return array.filter(function(item) {
              return blackList.indexOf(item.id) === -1; // item id not found in blacklist
          });
      };
    }
    projectController.$inject = ['$scope','$http', '$window', 'project', 'tasks',  'projectusers', 'users', '$state'];

    function projectController($scope, $http, $window, project, tasks, projectusers, users, $state) {
        $scope.localid = localStorage.getItem('UserId')
        $scope.project = project;
        $scope.tasks = tasks;
        $scope.projectusers = projectusers;
        $scope.users = users;
        $scope.user = {};
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

(function(angular) {
    var module = angular.module('todoApp');

    module.controller('projectController', projectController);


    projectController.$inject = ['$scope','$http', '$window', 'project', 'tasks',  'projectusers', 'usersFiltered', '$state', 'projectService', '$q', '$uibModal'];

    function projectController($scope, $http, $window, project, tasks, projectusers, usersFiltered, $state, projectService, $q, $uibModal) {
              $scope.localid = localStorage.getItem('UserId')
              $scope.project = project;
              $scope.tasks = tasks;
              $scope.projectusers = projectusers;
              $scope.openTaskModal = function openTaskModal() {
                  var modalInstance = $uibModal.open({
                      //path of the modal template
                      templateUrl: './templates/addProjectTaskTemplate.html',
                      //modal controller
                      controller: ['$scope', '$uibModalInstance',
                          function($scope, $uibModalInstance) {
                            $scope.project = project;
                            $scope.newTask = function(){
                              debugger;
                              var data = {Name: $scope.name, Project: $scope.project._id ,DueDate: $scope.duedate};
                              console.log('Hey newtask')
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


                          }
                      ]
                  });
              }

              $scope.openLinkUserModal = function openLinkUserModal() {
                  var modalInstance = $uibModal.open({
                      //path of the modal template
                      templateUrl: './templates/linkUserTemplate.html',
                      //modal controller
                      controller: ['$scope', '$uibModalInstance',
                          function($scope, $uibModalInstance) {
                              $scope.linkuser = function(id){
                                var data = {Project: id, User: $scope.user.selected._id};
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
                      ]
                  });
              }

              $scope.openStatusModal = function openStatusModal() {
                  var modalInstance = $uibModal.open({
                      //path of the modal template
                      templateUrl: './templates/editStatusTemplate.html',
                      //modal controller
                      controller: ['$scope', '$uibModalInstance',
                          function($scope, $uibModalInstance) {
                            $scope.editStatus = function(id, body){
                              projectService.editproject(id, body);
                            }
                          }
                      ]
                  });
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

    }





}(angular));

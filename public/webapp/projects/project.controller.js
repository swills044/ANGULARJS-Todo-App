(function(angular) {
    var module = angular.module('todoApp');

    module.controller('projectController', projectController);


    projectController.$inject = ['$scope', '$http', '$window', 'project', 'tasks', 'projectusers', '$state', 'projectService', '$q', '$uibModal', 'users', 'adminCheck'];

    function projectController($scope, $http, $window, project, tasks, projectusers, $state, projectService, $q, $uibModal, users, adminCheck) {
        //Variables
        $scope.project = project;
        $scope.tasks = tasks;
        $scope.admin;

        if (adminCheck == 'admin') {
            $scope.admin = true;
        }
        $scope.projectusers = projectusers;
        const localid = localStorage.getItem('UserId');
        $scope.users = projectusers.filter(function(u) {
            return u._id !== localid;
        });
        //Functions
        $scope.removeYourself = function (id){
          swal({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
          }).then(function() {
              var data = {
                  Project: id,
                  User: localid
              };
              var config = {
                  headers: {
                      'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
                  }
              }
              debugger;
              swal(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
              )
              $http.post(window.endpoint + 'api/project/unlinkuser', data, config)
                  .then(function() {
                      $state.reload();
                  })
          })
        }

        $scope.usersClick = function() {

          var modalInstance = $uibModal.open({
              //path of the modal template
              templateUrl: './templates/projectsUsersTemplate.html',
              //modal controller
              controller: ['$scope', '$uibModalInstance',
                  function($scope, $uibModalInstance) {
                    $scope.users = projectusers.filter(function(u) {
                        return u._id !== localid;
                    });
                    $scope.project = project;
                    $scope.unlinkuser = function(id, userid) {
                        swal({
                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, delete it!'
                        }).then(function() {
                            var data = {
                                Project: id,
                                User: userid
                            };
                            debugger;
                            var config = {
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
                                }
                            }

                            swal(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            $http.post(window.endpoint + 'api/project/unlinkuser', data, config)
                                .then(function() {
                                    $state.reload();
                                })
                        })
                    }
                  }
              ]
          });
        }

        $scope.openDescriptionModal = function openDescriptionModal() {
            var modalInstance = $uibModal.open({
                //path of the modal template
                templateUrl: './templates/projectDescription.html',
                //modal controller
                controller: ['$scope', '$uibModalInstance',
                    function($scope, $uibModalInstance) {
                        $scope.project = project;
                    }
                ]
            });
        }

        $scope.openTaskModal = function openTaskModal() {
            var modalInstance = $uibModal.open({
                //path of the modal template
                templateUrl: './templates/addProjectTaskTemplate.html',
                //modal controller
                controller: ['$scope', '$uibModalInstance',
                    function($scope, $uibModalInstance) {
                        $scope.project = project;

                        $scope.newTask = function() {
                            if ($scope.name === undefined) {
                                return;
                            } else if ($scope.duedate === null) {
                                return;
                            } else {
                                modalInstance.close()
                                swal(
                                    'Task Added!',
                                    'You added ' + $scope.name,
                                    'success'
                                )
                                var data = {
                                    Name: $scope.name,
                                    Project: project._id,
                                    DueDate: $scope.duedate,
                                    ProjectName: project.Name,
                                    Description: $scope.desc

                                };
                                var config = {
                                    headers: {
                                        "Authorization": "Bearer " + localStorage.getItem("tokenString")
                                    }
                                }
                                $http.post(window.endpoint + "api/task", data, config)
                                    .then(function() {
                                        $state.reload();

                                    })
                            }
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
                        $scope.project = project;
                        $scope.user = {};
                        $scope.types = ['admin', 'worker'];
                        $scope.users = users;
                        $scope.linkuser = function(id) {
                            modalInstance.close()
                            swal(
                                'User linked!',
                                'You linked ' + $scope.user.selected.Name,
                                'success'
                            )
                            var data = {
                                Project: id,
                                User: $scope.user.selected._id,
                                Type: $scope.user.Type
                            };
                            var config = {
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
                                }
                            }
                            $http.post(window.endpoint + 'api/project/linkuser', data, config)
                                .then(function() {
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
                        $scope.statuss = ['NEW', 'INPROGRESS', 'COMPLETED'];
                        $scope.user = {};
                        $scope.editStatus = function() {
                            var data = {
                                Status: $scope.user.status
                            };
                            var config = {
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
                                }
                            }
                            $http.put(window.endpoint + 'api/project/' + project._id, data, config)
                                .then(function() {
                                    $state.reload();
                                })
                        }
                    }
                ]
            });
        }

        $scope.delete = function(id) {

            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(function() {
                var config = {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
                    }
                }

                swal(
                    'Deleted!',
                    'Your project has been deleted.',
                    'success'
                )

                $http.delete(window.endpoint + 'api/task/' + id, config)
                    .then(function() {
                        $state.reload();
                    })
            })
        }

        $scope.deleteProject = function(id) {
            swal({
                title: 'Are you sure?',
                text: " All tasks will be deleted!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(function() {
                var config = {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
                    }
                }

                swal(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )

                $http.delete(window.endpoint + 'userproject/' + id, config)
                    .then(function() {
                        $state.go('root.tasks', {});
                        $state.reload()
                    })
            })
        }

        $scope.taskInfo = function(task) {
            var modalInstance = $uibModal.open({
                //path of the modal template
                templateUrl: './templates/projectTaskInfo.html',
                //modal controller
                controller: ['$scope', '$uibModalInstance','projectService',
                    function($scope, $uibModalInstance, projectService) {
                        $scope.tusers;
                        projectService.taskUsers(task._id)
                        .then(function(response){
                           $scope.tusers = response.data; //received data returned by promise
                        });
                        $scope.task = task;

                        $scope.unlinkuser = function(id, userid) {
                          debugger;
                            swal({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, delete it!'
                            }).then(function() {
                                var data = {
                                    Task: id,
                                    User: userid
                                };
                                console.log(data);
                                var config = {
                                    headers: {
                                        'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
                                    }
                                }

                                swal(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                                $http.post(window.endpoint + 'api/task/unlinkuser', data, config)
                                    .then(function() {
                                        $state.reload();
                                    })
                            })
                        }


                        $scope.linkTaskUser = function(t){
                          var modalInstance = $uibModal.open({
                              //path of the modal template
                              templateUrl: './templates/linkUserTaskTemplate.html',
                              //modal controller
                              controller: ['$scope', '$uibModalInstance',
                                  function($scope, $uibModalInstance) {
                                    $scope.users = projectusers.filter(function(u) {
                                        return u._id !== localid;
                                    });
                                      $scope.task = task;
                                      $scope.user = {};



                                      $scope.linkuser = function(id) {
                                          modalInstance.close()
                                          swal(
                                              'User linked!',
                                              'You linked ' + $scope.user.selected.Name,
                                              'success'
                                          )
                                          var data = {
                                              Task: id,
                                              User: $scope.user.selected._id,
                                          };
                                          console.log(data);
                                          var config = {
                                              headers: {
                                                  'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
                                              }
                                          }
                                          $http.post(window.endpoint + 'api/task/linkuser', data, config)
                                              .then(function() {
                                                  $state.reload();
                                              })

                                      }
                                  }
                              ]
                          });

                        }
                    }
                ]
            })
        };

    }
}(angular));

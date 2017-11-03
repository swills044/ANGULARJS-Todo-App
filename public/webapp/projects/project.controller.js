(function(angular) {
  var module = angular.module('todoApp');

  module.controller('projectController', projectController);


  projectController.$inject = ['$scope','$http', '$window', 'project', 'tasks',  'projectusers', '$state', 'projectService', '$q', '$uibModal', 'users', 'adminCheck'];

  function projectController($scope, $http, $window, project, tasks, projectusers, $state, projectService, $q, $uibModal, users, adminCheck) {
    //Variables
    $scope.project = project;
    $scope.tasks = tasks;
    $scope.admin;
    if (adminCheck == 'admin') {
      $scope.admin = true;
    }


    //Functions

    $scope.openTaskModal = function openTaskModal() {
      var modalInstance = $uibModal.open({
        //path of the modal template
        templateUrl: './templates/addProjectTaskTemplate.html',
        //modal controller
        controller: ['$scope', '$uibModalInstance',
        function($scope, $uibModalInstance) {
          $scope.project = project;
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
            modalInstance.close()
            swal(
              'Task Added!',
              'You added ' + $scope.name,
              'success'
            )
            var data = {Name: $scope.name, Project: project._id ,DueDate: $scope.duedate, ProjectName: project.Name};
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
          $scope.project = project;
          $scope.user = {};
          $scope.types = ['admin', 'worker'];
          $scope.users = users;
          $scope.linkuser = function(id){
            modalInstance.close()
            swal(
              'User linked!',
              'You linked ' + $scope.user.selected.Name,
              'success'
            )
            var data = {Project: id, User: $scope.user.selected._id, Type: $scope.user.Type};
            console.log(data);
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
        }
      ]
    });
    }

    $scope.unlinkuser = function(id, userid){
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(function () {
      var data = {Project: id, User: userid};
      var config = {
        headers : {
          'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
        }
      }

      swal(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      $http.post(window.endpoint +'api/project/unlinkuser', data, config)
      .then(function(){
        $state.reload();
      })
    })

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
        $scope.editStatus = function(){
          var data = {Status: $scope.user.status};
          var config = {
            headers : {
              'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
            }
          }
          $http.put(window.endpoint + 'api/project/' + project._id, data, config)
          .then(function(){
            $state.reload();
          })
        }
      }
    ]
      });
    }

    $scope.delete = function(id){

    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(function () {
      var config = {
        headers : {
          'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
        }
      }

      swal(
        'Deleted!',
        'Your project has been deleted.',
        'success'
      )

      $http.delete(window.endpoint + 'api/task/' + id, config)
      .then(function(){
        $state.reload();
      })
    })
  }

    $scope.deleteProject = function(id){
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(function () {
      var config = {
        headers : {
          'Authorization': 'Bearer ' + localStorage.getItem('tokenString')
        }
      }

      swal(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )

      $http.delete(window.endpoint + 'userproject/' + id, config)
      .then(function(){
        $state.go('root.tasks', {});
        $state.reload()
      })
    })
  }

    $scope.openUsers = function(){
      var modalInstance = $uibModal.open({
        //path of the modal template
        templateUrl: './templates/openUsersTemplate.html',
        //modal controller
        controller: ['$scope', '$uibModalInstance',
        function($scope, $uibModalInstance) {
            $scope.projectusers = projectusers;
            $scope.localid = localStorage.getItem('UserId');
            $scope.users = projectusers.filter(function(u){
              return u._id !== $scope.localid;
            });
        }
      ]
    });
    }
    //style functions
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#sidebar-wrapper").toggleClass("active");
    });
}
}(angular));

(function(angular) {
  var module = angular.module("todoApp");

  module.controller("TaskController", taskController);

  taskController.$inject = ["$scope", "rTasks", "rHeading", "$http", "$window", "rProjects", "$state", "$uibModal"];

  function taskController($scope, rTasks, rHeading, $http, $window, rProjects, $state, $uibModal) {
    $scope.heading = rHeading;
    $scope.tasks = rTasks;
    $scope.projects = rProjects;

    $scope.openAddTaskModal = function openAddTaskModal() {
      var modalInstance = $uibModal.open({
        //path of the modal template
        templateUrl: './templates/addTaskTemplate.html',
        windowClass: 'app-modal-window',
        //modal controller
        controller: ['$scope', '$uibModalInstance',
        function($scope, $uibModalInstance) {
          $scope.projects = rProjects;
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

          $scope.user = {};

          $scope.newTask = function(){
            modalInstance.close()
            swal(
              'Task Added!',
              'You added ' + $scope.name,
              'success'
            )
            if ($scope.user.selected == undefined) {
              $scope.user.selected = null;
              $scope.user.selected = {_id: null};
              var data = {Name: $scope.name, Project: $scope.user.selected._id , ProjectName: $scope.user.selected.Name, DueDate: $scope.duedate};
              var config = {
                headers : {
                  "Authorization": "Bearer " + localStorage.getItem("tokenString")
                }
              }
              $http.post(window.endpoint +"api/task", data, config)
              .then(function(){
                $state.reload();
              })
            }else {
              var data = {Name: $scope.name, Project: $scope.user.selected._id , ProjectName: $scope.user.selected.Name, DueDate: $scope.duedate};
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
          "Authorization": "Bearer " + localStorage.getItem("tokenString")
        }
      }

      swal(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )

      $http.delete(window.endpoint + "api/task/" + id, config)
      .then(function(){
        $state.reload();
      })
    })

  }



}
}(angular));

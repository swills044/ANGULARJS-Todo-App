(function(angular) {
    var module = angular.module("todoApp");

    module.controller("TaskController", taskController);

    taskController.$inject = ["$scope", "rTasks", "rHeading", "$http", "$window", "rProjects", "$state", "$uibModal"];

    function taskController($scope, rTasks, rHeading, $http, $window, rProjects, $state, $uibModal) {
        $scope.heading = rHeading;
        $scope.tasks = rTasks;
        $scope.projects = rProjects;


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
                        "Authorization": "Bearer " + localStorage.getItem("tokenString")
                    }
                }

                swal(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )

                $http.delete(window.endpoint + "api/task/" + id, config)
                    .then(function() {
                        $state.reload();
                    })
            })
        }

        $scope.taskInfo = function(task) {
            var modalInstance = $uibModal.open({
                //path of the modal template
                templateUrl: './templates/taskInfo.html',
                //modal controller
                controller: ['$scope', '$uibModalInstance',
                    function($scope, $uibModalInstance) {

                        $scope.task = task;
                    }
                ]
            })
        };

    }


}(angular));

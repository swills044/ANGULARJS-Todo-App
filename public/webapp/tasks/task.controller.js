(function(angular) {
    var module = angular.module('todoApp');

    module.controller('TaskController', taskController);

    taskController.$inject = ['$scope', 'rTasks', 'rHeading'];

    function taskController($scope, rTasks, rHeading) {
        $scope.heading = rHeading;
        $scope.tasks = rTasks;                                               
        
    }
}(angular));

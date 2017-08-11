(function(window, angular) {
    var module = angular.module('todoApp');

    module.config(moduleConfig);
    module.run(moduleRun);

    moduleConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function moduleConfig($stateProvider, $urlRouterProvider) {

        $stateProvider.state('root.tasks', {
            url: '/inbox',
            views: {
                'content-view@': {
                    templateUrl: '/webapp/tasks/task.partial.html',
                    controller: 'TaskController'
                }
            },
            resolve: {
                rTasks: function() {
                    return [{
                        "Id": 1,
                        "Name": "Task 1"
                    }, {
                        "Id": 2,
                        "Name": "Task 2"
                    }, {
                        "Id": 3,
                        "Name": "Task 3"
                    }, {
                        "Id": 4,
                        "Name": "Task 4"
                    }, {
                        "Id": 5,
                        "Name": "Task 5"
                    }, {
                        "Id": 6,
                        "Name": "Task 6"
                    }, {
                        "Id": 7,
                        "Name": "Task 7"
                    }, {
                        "Id": 8,
                        "Name": "Task 8"
                    }, {
                        "Id": 9,
                        "Name": "Task 9"
                    }, {
                        "Id": 10,
                        "Name": "Task 10"
                    }, {
                        "Id": 11,
                        "Name": "Task 11"
                    }, {
                        "Id": 12,
                        "Name": "Task 12"
                    }]
                },
                rHeading: function() {
                    return "Inbox"
                }
            }
        });
    }

    moduleRun.$inject = [];

    function moduleRun() {

    }
})(window, angular);
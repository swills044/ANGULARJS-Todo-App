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
                rTasks: function(taskService) {
                    return taskService.usertasks()
                        .then(function mySuccess(response) {
                             return response.data;
                        }, function myError(response) {
                            return response.statusText;

                });
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
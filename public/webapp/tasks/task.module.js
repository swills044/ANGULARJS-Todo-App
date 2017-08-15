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
        $stateProvider.state('root.agendatoday', {

            url: '/agenda?today',
            views: {
                'content-view@': {
                    templateUrl: '/webapp/tasks/task.partial.html',
                    controller: 'TaskController'
                }
            },
            resolve: {
                rTasks: function(taskService){
                    return taskService.usertasks()
                        .then(function mySuccess(response){                          
                            //Check date filter
                                var tasks = [];
                                response.data.forEach(function(task){
                                    var date = moment(task.DueDate).format('YYYY-MM-DD');
                                    var now = moment(Date.now()).format('YYYY-MM-DD');          
                                    if ( date == now) {
                                        tasks.push(task);                                 
                                    }
                                })
                                return tasks;
                        }, function myError(response) {
                            return response.statusText;
                        }
                        )
                },
                rHeading: function() {
                    return "Due today"
                }
            }

        })
        $stateProvider.state('root.agendaweek', {
            url: '/agenda?week',
            views: {
                'content-view@': {
                    templateUrl: '/webapp/tasks/task.partial.html',
                    controller: 'TaskController'
                }
            },
            resolve: {
                rTasks: function(taskService){
                    return taskService.usertasks()
                        .then(function mySuccess(response){
                            var tasks = [];
                            response.data.forEach(function(task){
                                var date = moment(task.DueDate).format('DD');
                                var date = parseInt(date);
                                var today = moment(Date.now()).format('DD');
                                var today = parseInt(today);
                                var end = today + 7;
                                for(;today < end;  today++){
                                    var days = []
                                    days.push(today);
                                    var i = days.indexOf(date);
                                    if (i > -1) {
                                        tasks.push(task);
                                    }
                                }
                            })
                            return tasks;
                        }, function myError(response) {
                            return response.statusText;
                        } 
                        )
                },
                rHeading: function(){
                    return "next 7 days"
                }
            }
        })
    }

    moduleRun.$inject = [];

    function moduleRun() {

    }
})(window, angular);
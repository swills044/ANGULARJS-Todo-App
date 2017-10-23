(function(window, angular) {
    var module = angular.module("todoApp");

    module.config(moduleConfig);
    module.run(moduleRun);

    moduleConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

    function moduleConfig($stateProvider, $urlRouterProvider) {

        $stateProvider.state("root.tasks", {
            url: "/inbox",
            views: {
                "content-view@": {
                    templateUrl: "/webapp/tasks/task.partial.html",
                    controller: "TaskController"
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
                },
                rProjects: function(projectService) {
                  var userid = localStorage.getItem('UserId');
                    return projectService.get(userid)
                        .then(function mySuccess(response) {
                            return response.data;
                        }, function myError(response) {
                            return response.statusText;

                });

                }
            }
        });
        $stateProvider.state("root.agendatoday", {

            url: "/agenda?today",
            views: {
                "content-view@": {
                    templateUrl: "/webapp/tasks/task.partial.html",
                    controller: "TaskController"
                }
            },
            resolve: {
                rTasks: function(taskService){
                    return taskService.usertaskstoday()
                        .then(function mySuccess(response){
                            return response.data;
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
        $stateProvider.state("root.agendaweek", {
            url: "/agenda?week",
            views: {
                "content-view@": {
                    templateUrl: "/webapp/tasks/task.partial.html",
                    controller: "TaskController"
                }
            },
            resolve: {
                rTasks: function(taskService){
                    return taskService.usertasksweek()
                        .then(function mySuccess(response){
                            return response.data;
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

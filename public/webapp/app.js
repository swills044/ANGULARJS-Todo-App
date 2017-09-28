(function(angular) {
    var module = angular.module('todoApp', [
        'ui.router',
        'angularMoment',
        'ngRoute',
        'ngSanitize',
        'ui.bootstrap',
        'ui.select'
    ]);
    module.service('authInterceptor', function($q) {
            var service = this;

            service.responseError = function(response) {
                if (response.status == 401) {
                    window.location = "/login.html";
                }
                return $q.reject(response);
            };
        })
        module.config(['$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
        }])
    module.config(config);
    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/inbox');
        $urlRouterProvider.when('', '/inbox');
        $stateProvider.state('root', {
            url: '',
            abstract: true,
            views: {
                'topbar': {
                    templateUrl: './layout/topbar/topbar.partial.html',
                    controller: 'topbarcontroller'
                },
                'sidebar-left': {
                    templateUrl: './layout/sidebar-left/sidebar-left.partial.html',
                    controller: 'sidebarleftcontroller'
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
                rProjects: function(projectService) {
                    return projectService.get()
                        .then(function mySuccess(response) {
                            return response.data;
                        }, function myError(response) {
                            return response.statusText;

                        });

                },
                user: function(userService) {
                  return userService.loggedIn()
                    .then(function mySuccess(res){
                      return res.data;

                    }, function myError(res){
                      return res.statusText;
                    })
                }
            }

        })
        $stateProvider.state('root.project', {
            url: '/project?{{id}}',
            views: {
                'content-view@': {
                    templateUrl: './projects/project.partial.html',
                    controller: 'projectController'
                }
            },
            resolve: {
                project: function(projectService, $stateParams) {
                    return projectService.getById($stateParams)
                        .then(function mySuccess(res) {
                            return res.data;
                        }, function myError(res) {
                            return res.statusText;
                        })
                },
                tasks: function(projectService, $stateParams) {
                    return projectService.getTaskByProjectId($stateParams)
                        .then(function mySuccess(res) {
                            return res.data;
                        }, function myError(res) {
                            return res.statusText;
                        })
                },
                projectusers: function(projectService, $stateParams) {
                    return projectService.userprojects($stateParams)
                        .then(function mySuccess(res) {
                            return res.data;
                        }, function myError(res) {
                            return res.statusText;
                        })
                },
                usersFiltered: function(userService, $stateParams) {
                    return userService.usersFiltered($stateParams)
                        .then(function mySuccess(res) {
                            return res.data;
                        }, function myError(res) {
                            return res.statusText;
                        })
                }
            }
        })
    }


}(angular));

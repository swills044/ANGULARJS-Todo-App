(function(angular) {
  var module = angular.module('todoApp', [
    'ui.router',
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'ui.select'
  ]);


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
          var userid = localStorage.getItem('UserId');
          return projectService.get(userid)
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
        users: function(projectService, $stateParams){
          return projectService.filterUsers($stateParams)
          .then(function mySuccess(res){
            return res.data;
          }, function myError(res){
            return res.statusText;
          })
        },
        adminCheck: function(projectService, $stateParams){
          var userid = localStorage.getItem('UserId');
          return projectService.adminCheck($stateParams, userid)
          .then(function mySuccess(res){
            return res.data;
          }, function myError(res){
            return res.statusText;
          })
        }
      }
    })
  }

  //Error interceptors

  //When users AccessToken is removed then return them to log out
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

  //When an error is recieved redirect them to the root
    module.service('errorInterceptor', function($q, $timeout, $stateParams) {
      var service = this;

      service.responseError = function(response) {
        if (response.status == 404) {
          window.location = "/webapp/index.html";
        }
        else if (response.status == 400) {
          window.location = "/webapp/index.html";
        }
        return $q.reject(response);
      };
    })
    module.config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('errorInterceptor');
    }])

}(angular));

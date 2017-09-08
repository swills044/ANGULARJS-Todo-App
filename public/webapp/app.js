(function(angular) {
 var module = angular.module('todoApp', [
  'ui.router',
  'angularMoment',
  'ngRoute',
  'ngSanitize',
  'ui.bootstrap',
  'modal',
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
      rProjects: function(projectService) {
       return projectService.get()
        .then(function mySuccess(response) {
         return response.data;
        }, function myError(response) {
         return response.statusText;

        });

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
        users: function(userService){
          return userService.users()
          .then(function mySuccess(res){
            return res.data;
          }, function myError(res){
            return res.statusText;
          })
        }
       }
      })
  }


}(angular));

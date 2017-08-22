// (function(window, angular) {
//     var module = angular.module('todoApp');

//     module.config(moduleConfig);
//     module.run(moduleRun);

//     moduleConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

//     function moduleConfig($stateProvider, $urlRouterProvider) {

//         $stateProvider.state('root.projects', {
//             url: '/inbox',
//             views: {
//                 'content-view@': {
//                     templateUrl: '/webapp/projects/project.partial.html',
//                     controller: 'projectController'
//                 }
//             },
//             resolve: {
//                 rprojects: function(projectService) {
//                     return projectService.userprojects()
//                         .then(function mySuccess(response) {
//                             return response.data;
//                         }, function myError(response) {
//                             return response.statusText;

//                 });
//                 },
//                 rHeading: function() {
//                     return "Inbox"
//                 },
//                 rProjects: function(projectService) {
//                     return projectService.get()
//                         .then(function mySuccess(response) {
//                             return response.data;
//                         }, function myError(response) {
//                             return response.statusText;

//                 });
             
//                 }
//             }
//         });
//         $stateProvider.state('root.agendatoday', {

//             url: '/agenda?today',
//             views: {
//                 'content-view@': {
//                     templateUrl: '/webapp/projects/project.partial.html',
//                     controller: 'projectController'
//                 }
//             },
//             resolve: {
//                 rprojects: function(projectService){
//                     return projectService.userprojectstoday()
//                         .then(function mySuccess(response){                          
//                             return response.data;
//                         }, function myError(response) {
//                             return response.statusText;
//                         }
//                         )
//                 },
//                 rHeading: function() {
//                     return "Due today"
//                 }
//             }

//         })
//         $stateProvider.state('root.agendaweek', {
//             url: '/agenda?week',
//             views: {
//                 'content-view@': {
//                     templateUrl: '/webapp/projects/project.partial.html',
//                     controller: 'projectController'
//                 }
//             },
//             resolve: {
//                 rprojects: function(projectService){
//                     return projectService.userprojectsweek()
//                         .then(function mySuccess(response){
//                             return response.data;
//                         }, function myError(response) {
//                             return response.statusText;
//                         } 
//                         )
//                 },
//                 rHeading: function(){
//                     return "next 7 days"
//                 }
//             }
//         })
//     }

//     moduleRun.$inject = [];

//     function moduleRun() {

//     }
// })(window, angular);
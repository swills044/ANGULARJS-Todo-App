(function(angular) {

        var module = angular.module('modal', ['ui.bootstrap', 'ui.select', 'ngSanitize'])
            .controller('MyModalController', MyModalController)
            .directive('modalTrigger', modalTriggerDirective)
            .factory('$myModal', myModalFactory);

        function MyModalController($uibModalInstance, $http, $state, $scope) {
            var vm = this;
            vm.confirm = $uibModalInstance.close;
            vm.cancel = $uibModalInstance.dismiss;
            $scope.itemArray = [{
                    id: 1,
                    name: 'first'
                },
                {
                    id: 2,
                    name: 'second'
                },
                {
                    id: 3,
                    name: 'third'
                },
                {
                    id: 4,
                    name: 'fourth'
                },
                {
                    id: 5,
                    name: 'fifth'
                },
            ];

            $scope.selected = {
                value: $scope.itemArray[0]
            };
            //function
            $('.open-datetimepicker').click(function(event) {
              event.preventDefault();
              $('#datepicker').focus();
            });

            $(function() {
              $("#datepicker").datepicker({
                changeMonth: true, //this option for allowing user to select month
                changeYear: true //this option for allowing user to select from year range
              });
            })

            $scope.newTask = function() {
              var data = {
                Name: $scope.name,
                Project: $scope.project._id,
                DueDate: $scope.duedate
              };

              var config = {
                headers: {
                  "Authorization": "Bearer " + localStorage.getItem("tokenString")
                }
              }
                $http.post(window.endpoint + "api/task", data, config)
                  .then(function() {
                    $state.reload();

                  })
              }
          }



          function modalTriggerDirective($myModal) {
                function postLink(scope, iElement, iAttrs) {
                    function onClick() {
                        var size = scope.$eval(iAttrs.size) || 'lg'; // default to large size
                        var title = scope.$eval(iAttrs.title) || 'Default Title';
                        var message = scope.$eval(iAttrs.message) || 'Default Message';
                        $myModal.open(size, title, message);
                    }
                    iElement.on('click', onClick);
                    scope.$on('$destroy', function() {
                        iElement.off('click', onClick);
                    });
                }

                return {
                    link: postLink
                };
            }

          function myModalFactory($uibModal) {
                var open = function(size, title, message) {
                    return $uibModal.open({
                        controller: 'MyModalController',
                        controllerAs: 'vm',
                        templateUrl: './templates/addTaskTemplate.html',
                        size: size,
                        resolve: {
                            items: function() {
                                return {
                                    title: title,
                                    message: message
                                };
                            }
                        }
                    });
                };

                return {
                    open: open
                };
            }

        }(angular))

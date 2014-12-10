/**
* IndexController
* @namespace riddles.layout.controllers
*/
(function() {
  'use strict';

  angular
    .module('riddles.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'Authentication', 'Riddles', 'Snackbar'];

  /**
  * @namespace IndexController
  */
  function IndexController($scope, Authentication, Riddles, Snackbar) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.posts = [];

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf riddles.layout.controllers.IndexController
    */
    function activate() {
      Riddles.all().then(riddlesSuccessFn, riddlesErrorFn);

      // When creating a new riddle, fire off an event called riddle.created
      // By catching this event here, we can add this new riddle to the
      //  front of the vm.riddles array
      $scope.$on('riddle.created', function(event, riddle) {
        vm.riddles.unshift(riddle);
      });

      // If there is an error, we have to remove the riddle we created at the
      //  front of vm.riddles
      $scope.$on('riddle.created.error', function () {
        vm.riddles.shift();
      });

      /**
      * @name riddlesSuccessFn
      * @desc Update riddles array on view
      */
      function riddlesSuccessFn(data, status, headers, config) {
        vm.riddles = data.data;
      }

      /**
      * @name riddlesErrorFn
      * @desc Show snackbar with error
      */
      function riddlesErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }
  }
})();

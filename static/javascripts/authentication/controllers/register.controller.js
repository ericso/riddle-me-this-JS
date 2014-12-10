/**
* Register controller
* @namespace riddlesapp.authentication.controllers
*/
(function() {
  'use strict';

  angular
    .module('riddlesapp.authentication.controllers')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$location', '$scope', 'Authentication', 'Snackbar'];

  /**
  * @namespace RegisterController
  */
  function RegisterController($location, $scope, Authentication, Snackbar) {
    var vm = this;

    vm.register = register;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf riddlesapp.authentication.controllers.RegisterController
    */
    function activate() {
      // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }

    /**
    * @name register
    * @desc Register a new user
    * @memberOf riddlesapp.authentication.controllers.RegisterController
    */
    function register() {
      Authentication
        .register(vm.email, vm.password, vm.username)
        .then(null, registerErrorFn);

      /**
      * @name registerErrorFn
      * @desc Show registration error on Snackbar
      */
      function registerErrorFn(data, status, headers, config) {
        Snackbar.error('Unable to register');
      }
    }
  }
})();

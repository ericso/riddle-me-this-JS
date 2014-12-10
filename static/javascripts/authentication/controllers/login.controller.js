/**
* LoginController
* @namespace riddlesapp.authentication.controllers
*/
(function() {
  'use static';

  angular
    .module('riddlesapp.authentication.controllers')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', '$scope', 'Authentication', 'Snackbar'];

  /**
  * @namespace LoginController
  */
  function LoginController($location, $scope, Authentication, Snackbar) {
    var vm = this;

    vm.login = login;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf riddlesapp.authentication.controllers.LoginController
    */
    function activate() {
      // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }

    /**
    * @name login
    * @desc Log the user in
    * @memberOf riddlesapp.authentication.controllers.LoginController
    */
    function login() {
      Authentication
        .login(vm.email, vm.password)
        .then(null, loginErrorFn);

      /**
      * @name logoutErrorFn
      * @desc Show login error on Snackbar
      */
      function loginErrorFn(data, status, headers, config) {
        Snackbar.error('Unable to login');
      }
    }
  }

})();

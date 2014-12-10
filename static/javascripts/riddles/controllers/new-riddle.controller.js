/**
* NewRiddleController
* @namespace riddlesapp.riddles.controllers
*/
(function () {
  'use strict';

  angular
    .module('riddlesapp.riddles.controllers')
    .controller('NewRiddleController', NewRiddleController);

  NewRiddleController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Riddles'];

  /**
  * @namespace NewRiddleController
  */
  function NewRiddleController($rootScope, $scope, Authentication, Snackbar, Riddles) {
    var vm = this;

    vm.submit = submit;

    /**
    * @name submit
    * @desc Create a new Riddle
    * @memberOf riddlesapp.riddles.controllers.NewRiddleController
    */
    function submit() {
      $rootScope.$broadcast('riddle.created', {
        question: vm.question,
        hint: vm.hint,
        answer: vm.answer,
        source: vm.source,
        author: {
          username: Authentication.getAuthenticatedAccount().username
        }
      });

      $scope.closeThisDialog();

      Riddles.create(vm.question, vm.hint, vm.answer, vm.source).then(createPostSuccessFn, createPostErrorFn);


      /**
      * @name createPostSuccessFn
      * @desc Show snackbar with success message
      */
      function createPostSuccessFn(data, status, headers, config) {
        Snackbar.show('Success! Riddle created.');
      }


      /**
      * @name createPostErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function createPostErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('riddle.created.error');
        Snackbar.error(data.error);
      }
    }
  }
})();

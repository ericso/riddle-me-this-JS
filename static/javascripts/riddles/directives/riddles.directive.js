/**
* Riddles
* @namespace riddlesapp.riddles.directives
*/
(function () {
  'use strict';

  angular
    .module('riddlesapp.riddles.directives')
    .directive('riddles', riddles);

  /**
  * @namespace Riddles
  */
  function riddles() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf riddlesapp.riddles.directives.Riddles
    */
    var directive = {
      controller: 'RiddlesController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        riddles: '='
      },
      templateUrl: '/static/templates/riddles/riddles.html'
    };

    return directive;
  }
})();

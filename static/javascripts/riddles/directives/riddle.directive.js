/**
* Riddle
* @namespace riddlesapp.riddles.directives
*/
(function () {
  'use strict';

  angular
    .module('riddlesapp.riddles.directives')
    .directive('riddle', riddle);

  /**
  * @namespace Riddle
  */
  function riddle() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf riddlesapp.riddles.directives.Riddle
    */
    var directive = {
      restrict: 'E',
      scope: {
        riddle: '='
      },
      templateUrl: '/static/templates/riddles/riddle.html'
    };

    return directive;
  }
})();

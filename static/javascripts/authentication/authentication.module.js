(function() {
  'use strict';

  angular
    .module('riddles.authentication', [
      'riddles.authentication.controllers',
      'riddles.authentication.services'
    ]);

  angular
    .module('riddles.authentication.controllers', []);

  angular
    .module('riddles.authentication.services', ['ngCookies']);

})();

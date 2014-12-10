(function() {
  'use strict';

  angular
    .module('riddlesapp.authentication', [
      'riddlesapp.authentication.controllers',
      'riddlesapp.authentication.services'
    ]);

  angular
    .module('riddlesapp.authentication.controllers', []);

  angular
    .module('riddlesapp.authentication.services', ['ngCookies']);

})();

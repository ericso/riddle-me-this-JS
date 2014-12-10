(function() {
  'use strict';

  angular
    .module('riddlesapp.riddles', [
      'riddlesapp.riddles.controllers',
      'riddlesapp.riddles.directives',
      'riddlesapp.riddles.services'
    ]);

  angular
    .module('riddlesapp.riddles.controllers', []);

  angular
    .module('riddlesapp.riddles.directives', ['ngDialog']);

  angular
    .module('riddlesapp.riddles.services', []);
})();

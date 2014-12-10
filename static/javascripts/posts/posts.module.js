(function() {
  'use strict';

  angular
    .module('riddlesapp.posts', [
      'riddlesapp.posts.controllers',
      'riddlesapp.posts.directives',
      'riddlesapp.posts.services'
    ]);

  angular
    .module('riddlesapp.posts.controllers', []);

  angular
    .module('riddlesapp.posts.directives', ['ngDialog']);

  angular
    .module('riddlesapp.posts.services', []);
})();

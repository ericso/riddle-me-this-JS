(function() {
  'use strict';

  angular
    .module('riddles.posts', [
      'riddles.posts.controllers',
      'riddles.posts.directives',
      'riddles.posts.services'
    ]);

  angular
    .module('riddles.posts.controllers', []);

  angular
    .module('riddles.posts.directives', ['ngDialog']);

  angular
    .module('riddles.posts.services', []);
})();

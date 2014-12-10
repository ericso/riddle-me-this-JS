(function() {
  'use strict';

  angular
    .module('riddlesapp', [
      'riddlesapp.config',
      'riddlesapp.routes',
      'riddlesapp.authentication',
      'riddlesapp.layout',
      'riddlesapp.posts',
      'riddlesapp.utils',
      'riddlesapp.profiles',
      'riddlesapp.riddles'
    ]);

  angular
    .module('riddlesapp.config', []);

  angular
    .module('riddlesapp.routes', ['ngRoute']);


  angular
    .module('riddlesapp')
    .run(run);

  run.$inject = ['$http'];

  /**
  * @name run
  * @desc Update xsrf $http headers to align with Django's defaults
  */
  function run($http) {
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
  }
})();


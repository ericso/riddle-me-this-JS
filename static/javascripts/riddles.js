(function() {
  'use strict';

  angular
    .module('riddles', [
      'riddles.config',
      'riddles.routes',
      'riddles.authentication',
      'riddles.layout',
      'riddles.posts',
      'riddles.utils',
      'riddles.profiles'
    ]);

  angular
    .module('riddles.config', []);

  angular
    .module('riddles.routes', ['ngRoute']);


  angular
    .module('riddles')
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


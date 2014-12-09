/**
* Posts
* @namespace riddles.posts.directives
*/
(function() {
  'use strict';

  angular
    .module('riddles.posts.directives')
    .directive('posts', posts);

  /**
  * @namespace Posts
  */
  function posts() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf riddles.posts.directives.Posts
    */
    var directive = {
      controller: 'PostsController',
      controllerAs: 'vm',
      // Set the value of restrict to E (for element) which means Angular
      //  should only match the name of our directive with the name of an
      //  element: <posts></posts>
      restrict: 'E',
      scope: {
        // Set $scope.posts to the value passed in through the posts attribute
        //  in the template
        posts: '='
      },
      templateUrl: '/static/templates/posts/posts.html'
    };

    return directive;
  }
})();

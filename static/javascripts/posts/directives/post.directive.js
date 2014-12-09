/**
* Post
* @namespace riddles.posts.directives
*/
(function() {
  'use strict';

  angular
    .module('riddles.posts.directives')
    .directive('post', post)

  /**
  * @namespace Post
  */
  function post() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf riddles.posts.directives.Post
    */
    var directive = {
      restrict: 'E',
      scope: {
        post: '='
      },
      templateUrl: '/static/templates/posts/post.html'
    };

    return directive;
  }
})();

/**
* IndexController
* @namespace riddlesapp.layout.controllers
*/
(function() {
  'use strict';

  angular
    .module('riddlesapp.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'Authentication', 'Posts', 'Snackbar'];

  /**
  * @namespace IndexController
  */
  function IndexController($scope, Authentication, Posts, Snackbar) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.posts = [];

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf riddlesapp.layout.controllers.IndexController
    */
    function activate() {
      Posts.all().then(postsSuccessFn, postsErrorFn);

      // When creating a new post, fire off an event called post.created
      // By catching this event here, we can add this new post to the
      //  front of the vm.posts array
      $scope.$on('post.created', function(event, post) {
        vm.posts.unshift(post);
      });

      // If there is an error, we have to remove the post we created at the
      //  front of vm.posts
      $scope.$on('post.created.error', function () {
        vm.posts.shift();
      });

      /**
      * @name postsSuccessFn
      * @desc Update posts array on view
      */
      function postsSuccessFn(data, status, headers, config) {
        vm.posts = data.data;
      }

      /**
      * @name postsErrorFn
      * @desc Show snackbar with error
      */
      function postsErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }
  }
})();

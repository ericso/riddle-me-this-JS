/**
* Riddles
* @namespace riddlesapp.riddles.services
*/
(function () {
  'use strict';

  angular
    .module('riddlesapp.riddles.services')
    .factory('Riddles', Riddles);

  Riddles.$inject = ['$http'];

  /**
  * @namespace Riddles
  * @returns {Factory}
  */
  function Riddles($http) {
    var Riddles = {
      all: all,
      create: create,
      get: get
    };

    return Riddles;

    ////////////////////

    /**
    * @name all
    * @desc Get all Riddles
    * @returns {Promise}
    * @memberOf riddlesapp.riddles.services.Riddles
    */
    function all() {
      return $http.get('/api/v1/riddles/');
    }


    /**
    * @name create
    * @desc Create a new Riddle
    * @param {string} question The question of the new Riddle
    * @param {string} hint The hint of the new Riddle
    * @param {string} answer The answer of the new Riddle
    * @param {string} source The source of the new Riddle
    * @returns {Promise}
    * @memberOf riddlesapp.riddles.services.Riddles
    */
    function create(question, hint, answer, source) {
      return $http.post('/api/v1/riddles/', {
        question: question,
        hint: hint,
        answer: answer,
        source: source
      });
    }

    /**
     * @name get
     * @desc Get the Riddles of a given user
     * @param {string} username The username to get Riddles for
     * @returns {Promise}
     * @memberOf riddlesapp.riddles.services.Riddles
     */
    function get(username) {
      return $http.get('/api/v1/accounts/' + username + '/riddles/');
    }
  }
})();

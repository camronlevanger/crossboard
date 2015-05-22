'use strict';

/**
 * @ngdoc function
 * @name crossboardApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crossboardApp
 */
angular.module('crossboardApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

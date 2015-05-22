'use strict';

/**
 * @ngdoc overview
 * @name crossboardApp
 * @description
 * # crossboardApp
 *
 * Main module of the application.
 */
angular
    .module('crossboardApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'vxWamp'
  ])
    .config(function ($routeProvider, $wampProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        // getQueryVariable needs to be figured out
        var protocol = getQueryVariable('protocol');
        var url = getQueryVariable('url');
        var port = getQueryVariable('port');
        var sub = getQueryVariable('sub');
        var realm = getQueryVariable('realm');
        var connection_string = protocol + '://' + url + ':' + port + '/' + sub;
        console.log(connection_string);
        var socket_realm = realm;
        console.log(socket_realm);

        $wampProvider.init({
            url: connection_string,
            realm: socket_realm
        });
    })
    .run(function ($wamp) {
        $wamp.open();
    });

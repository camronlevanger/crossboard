'use strict';

/**
 * @ngdoc function
 * @name crossboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the crossboardApp
 */
angular.module('crossboardApp')
    .controller('MainCtrl', function ($scope, $wamp, $interval) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        // Should stop using getQueryVariable even if config continues to use it
        var node_id = getQueryVariable('node_id'),
            workers = [];

        $scope.messages = [];
        $scope.node_info = 'Loading...';
        $scope.servertime = 'Loading...';
        $scope.uptime = 'Loading...';
        $scope.started = 'Loading...';
        $scope.workers = [];
        $scope.worker_log = 'Loading...';


        function on_event(event) {
            $scope.messages.push(event);
        }

        function getLogs() {
            console.log('getting logs: ' + workers.length);
            for (var i = 0; i < workers.length, i++;) {
                console.log('calling for log ' + i);
                $wamp.call('crossbar.node.' + node_id + '.get_worker_log', i).then(
                    function (res) {
                        console.log(res);
                        $scope.worker_log = res;
                    }
                );
            }
        }

        $wamp.subscribe('crossbar.on_node_ready', on_event(event));

        // This is a whole lot of copypasta that needs refactored
        function updateDashboard() {
            $wamp.call('crossbar.node.' + node_id + '.get_info').then(
                function (res) {
                    console.log(res);
                    $scope.node_info = res;
                }
            );

            $wamp.call('crossbar.node.' + node_id + '.utcnow').then(
                function (res) {
                    console.log(res);
                    $scope.servertime = res;
                }
            );

            $wamp.call('crossbar.node.' + node_id + '.uptime').then(
                function (res) {
                    console.log(res);
                    $scope.uptime = res;
                }
            );

            $wamp.call('crossbar.node.' + node_id + '.started').then(
                function (res) {
                    console.log(res);
                    $scope.started = res;
                }
            );

            $wamp.call('crossbar.node.' + node_id + '.get_workers').then(
                function (res) {
                    console.log(res);
                    workers = res;
                    $scope.workers = workers;
                    getLogs();
                }
            );

            $wamp.call('crossbar.node.' + node_id + '.get_process_info').then(
                function (res) {
                    console.log(res);
                    $scope.process_info = res;
                }
            );
        }

        // Interval should be configurable?
        $interval(updateDashboard, 5000);

    });

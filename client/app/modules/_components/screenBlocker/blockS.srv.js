/**
 * Created by Asiel on 1/10/2017.
 */

(
    function () {
        'use strict';

        var f = function ($timeout) {
            var self = this;

            var timer;

            var blocked = false;

            self.service = {
                block: fnBlock,
                unBlock: fnUnBlock,
                isBlocked: fnIsBlocked
            };

            return self.service;

            function fnBlock(message, instantly) {
                var t = 500;
                if (instantly) {
                    t = 0;
                }
                $timeout.cancel(timer);
                timer = $timeout(function () {
                    blocked = true;
                },t);
            }
            function fnUnBlock() {
                $timeout.cancel(timer);
                blocked = false;
            }

            function fnIsBlocked() {
                return blocked;
            }
        };

        f.$inject = ['$timeout'];

        angular.module('rrms')
            .service('blockSrv', f);
    }
)();
/**
 * Created by Asiel on 1/10/2017.
 */

(
    function () {
        'use strict';

        var f = function () {
            var self = this;

            var blocked = false;

            self.service = {
                block: fnBlock,
                unBlock: fnUnBlock,
                isBlocked: fnIsBlocked
            };

            return self.service;

            function fnBlock(message) {
                blocked = true;
            }
            function fnUnBlock() {
                blocked = false;
            }

            function fnIsBlocked() {
                return blocked;
            }
        };

        f.$inject = [];

        angular.module('rrms')
            .service('blockSrv', f);
    }
)();
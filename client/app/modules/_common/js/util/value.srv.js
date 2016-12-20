/**
 * Created by Asiel on 12/17/2016.
 */
(
    function () {
        'use strict';

        var valueSrv = function () {
            var self = this;

            self.service = {
                nNnN: fnNNnN
            };

            return self.service;

            function fnNNnN (val){
                return typeof val !== 'undefined' && val !== null;
            }
        };

        valueSrv.$inject = [];

        angular.module('rrms')
            .service('valueSrv', valueSrv);
    }
)();
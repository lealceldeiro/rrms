/**
 * Created by Asiel on 01/05/2017.
 */
(
    function () {
        'use strict';

        var f = function () {
            var self = this;

            self.service = {
                resolveDeferred: fnResolveDeferred
            };

            return self.service;

            function fnResolveDeferred (deferred){
                if (deferred.then) {
                    return deferred.then(
                        function (res) {
                            return res ? res.data : null;
                        },
                        function (resOnErr) {
                            return resOnErr ? resOnErr.data : null;
                        }
                    )
                }
            }
        };

        f.$inject = [];

        angular.module('rrms')
            .service('baseSrv', f);
    }
)();
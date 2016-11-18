/**
 * Created by Asiel on 11/17/2016.
 */
(
    function () {
        'use strict';

        var systemSrv = function (__env) {
            var self = this;
            var urlBase, APIUrl;

            self.service = {
                getUrlBase: fnGetUrlBase,
                getAPIUrl: fnGetAPIUrl
            };

            return self.service;

            //

            function fnGetUrlBase() {
                if (!urlBase) {
                    urlBase = __env.baseUrl;
                }
                return urlBase;
            }
            function fnGetAPIUrl() {
                if (!APIUrl) {
                    APIUrl = __env.apiUrl;
                }
                return APIUrl;
            }
        };

        systemSrv.$inject = ['__env'];

        angular.module('rrms')
            .service('systemSrv', systemSrv);
    }
)();
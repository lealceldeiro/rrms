/**
 * Created by Asiel on 11/20/2016.
 */

'use strict';

var envValidityChecker = function (__env, $location, ROUTE) {

    function request(req) {
        if (!__env.found) { //env file not found
            $location.path(ROUTE.CONFIG_ERROR);
        }
        return req
    }
    
    return {
        request: request
    };

};

var conf = function ($httpProvider) {
    $httpProvider['interceptors'].push('envValidityChecker');
};

envValidityChecker.$inject = ['__env', '$location', 'ROUTE'];
conf.$inject = ['$httpProvider'];

angular
    .module('rrms')
    .factory('envValidityChecker', envValidityChecker)
    .config(['$httpProvider', conf]);
/**
 * Created by Asiel on 11/20/2016.
 */

'use strict';

var envValidityChecker = function (__env, $location, ROUTE) {

    function request(req) {
        //VALIDITY OF CONFIGURATIONS
        if (!__env.found) { //env file not found
            $location.path(ROUTE.CONFIG_ERROR);
        }
        //token auth
        //todo: get headers and put custom header for sending the token along with request


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
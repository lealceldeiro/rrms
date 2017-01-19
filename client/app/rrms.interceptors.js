/**
 * Created by Asiel on 11/20/2016.
 */

'use strict';

var f = function (__env, $location, ROUTE, sessionSrv, systemSrv, notificationSrv) {

    function request(req) {
        //VALIDITY OF CONFIGURATIONS
        if (!__env.found) { //env file not found
            $location.path(ROUTE.CONFIG_ERROR);
        }

        //AUTH
        var token = sessionSrv.securityToken();
        if (token) {
            //put custom header for sending the token along with request
            req.headers[systemSrv.headerAuthTokenFlag] = systemSrv.headerAuthBearerFlag + token
        }

        return req;
    }

    function responseError(rejection) {
        if(rejection.status === systemSrv.unauthorizedResponseCodeFlag){
            notificationSrv.showNotif(notificationSrv.utilText.unauthorized.es,
                notificationSrv.utilText.titleError.es, notificationSrv.type.ERROR);
            //navigationSrv.goTo(ROUTE.MAIN);
        }
    }

    return {
        request: request,
        responseError: responseError
    };

};

var conf = function ($httpProvider) {
    $httpProvider['interceptors'].push('envValidityChecker');
};

f.$inject = ['__env', '$location', 'ROUTE', 'sessionSrv', 'systemSrv', 'notificationSrv'];
conf.$inject = ['$httpProvider'];

angular
    .module('rrms')
    .factory('envValidityChecker', f)
    .config(['$httpProvider', conf]);
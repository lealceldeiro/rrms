/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var loginSrv = function ($http, systemSrv, baseSrv, sessionSrv, $rootScope) {
    var vm = this;

    var url = systemSrv.APIAbsoluteUrl;
    var userVar = systemSrv.userAuthFlag;
    var passVar = systemSrv.passwordAuthFlag;

    vm.service = {
        siteTile: '',

        login: fnDoLogin,
        logout: fnDoLogout
    };

    $rootScope.$on('REFRESH_TOKEN', function () {
        _doRefreshToken().then(
            function (data) {
                var e = systemSrv.evalAuth(data, false, false);
                if (e) {
                    sessionSrv.setSecurityToken(systemSrv.getAuthToken());
                    sessionSrv.setSecurityRefreshToken(systemSrv.getAuthRefreshToken());
                    navigationSrv.goTo(ROUTE.MAIN);
                }
            }
        )
    });

    return vm.service;


    function fnDoLogin(username, password) {
        var data = {};
        data[userVar] = username;
        data[passVar] = password;
        return baseSrv.resolveDeferred($http.post(url + "login", data));
    }

    function _doRefreshToken() {
        var req = {
            method: 'POST',
            url: systemSrv.BaseUrl + '/oauth/access_token?' + systemSrv.newTokenRequesterFlag + "=" +
            systemSrv.itemRefreshTokenFlag + "&" + systemSrv.itemRefreshTokenFlag + "=" + sessionSrv.securityRefreshToken(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        var def = $http(req);
        return baseSrv.resolveDeferred(def);
    }

    function fnDoLogout() {
        var h = {};
        h[systemSrv.headerUnAuthTokenFlag] = sessionSrv.securityToken();
        var req = {
            method: 'GET',
            url: url + "logout",
            headers: h
        };
        return baseSrv.resolveDeferred($http(req));
    }

};

loginSrv.$inject = ['$http', 'systemSrv', 'baseSrv', 'sessionSrv', '$rootScope'];

angular.module('rrms')
    .service('loginSrv', loginSrv);
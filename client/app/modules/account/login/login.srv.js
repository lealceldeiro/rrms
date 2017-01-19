/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var loginSrv = function ($http, systemSrv, baseSrv, sessionSrv) {
    var vm = this;

    var url = systemSrv.APIUrl;
    var userVar = systemSrv.userAuthFlag;
    var passVar = systemSrv.passwordAuthFlag;

    vm.service = {
        siteTile: '',

        login: fnDoLogin,
        logout: fnDoLogout
    };

    return vm.service;


    function fnDoLogin(username, password) {
        var data = {};
        data[userVar] = username;
        data[passVar] = password;
        return baseSrv.resolveDeferred($http.post(url + "login", data));
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

loginSrv.$inject = ['$http', 'systemSrv', 'baseSrv', 'sessionSrv'];

angular.module('rrms')
    .service('loginSrv', loginSrv);
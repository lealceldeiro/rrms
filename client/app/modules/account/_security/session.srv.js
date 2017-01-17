/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var sessionSrv = function (baseSrv, systemSrv, localStorageService) {
    var self = this;
    const lsPrefix = "gMS_localS_";

    var sToken = null;
    var currentUser = null;

    var url = systemSrv.APIUrl;
    var userVar = systemSrv.userAuthFlag;
    var passVar = systemSrv.userAuthFlag;

    self.service = {
        isLogged: fnIsLogged,
        securityToken: fnSecurityToken,
        setSecurityToken: fnSetSecurityToken,
        setCurrentUser: fnSetCurrentUser,
        getCurrentUser: fnGetCurrentUser,

        login: fnDoLogin
    };

    return self.service;

    function fnDoLogin(username, password) {
        var data = {};
        data[userVar] = username;
        data[passVar] = password;
        return baseSrv.resolveDeferred($http.post(url + "login", data));
    }

    function fnIsLogged() {
        sToken = localStorageService.get(lsPrefix + "AuthToken");
        return (typeof sToken !== 'undefined' && sToken !== null);
    }

    function fnSecurityToken() {
        return sToken;
    }

    function fnSetSecurityToken(token) {
        sToken = token;
        localStorageService.set(lsPrefix + "AuthToken", token)
    }

    function fnSetCurrentUser(u) {
        currentUser = u;
    }
    function fnGetCurrentUser() {
        return currentUser;
    }

};

sessionSrv.$inject = ['baseSrv', 'systemSrv', 'localStorageService'];

angular.module('rrms')
    .service('sessionSrv', sessionSrv);
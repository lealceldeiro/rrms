/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var sessionSrv = function () {
    var vm = this;
    var sToken = null;
    var currentUser = null;

    vm.service = {
        isLogged: fnIsLogged,
        securityToken: fnSecurityToken,
        setSecurityToken: fnSetSecurityToken,
        setCurrentUser: fnSetCurrentUser,
        getCurrentUser: fnGetCurrentUser
    };

    return vm.service;

    function fnIsLogged() {
        return (typeof sToken !== 'undefined' && sToken !== null);
    }

    function fnSecurityToken() {
        return sToken;
    }

    function fnSetSecurityToken(token) {
        sToken = token;
    }

    function fnSetCurrentUser(u) {
        currentUser = u;
    }
    function fnGetCurrentUser() {
        return currentUser;
    }

};

sessionSrv.$inject = [];

angular.module('rrms')
    .service('sessionSrv', sessionSrv);
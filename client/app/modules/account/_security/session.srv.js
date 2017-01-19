/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var sessionSrv = function (baseSrv, systemSrv, localStorageService) {
    var self = this;
    const lsPrefix = "gMS_localS_";

    const refreshTKey = lsPrefix + "RefreshToken";
    const tokenKey =  lsPrefix + "AuthToken";
    const currentUKey =  lsPrefix + "CurrentUsr";

    var sToken = null;
    var rToken = null;
    var currentUser = null;

    var logged;

    self.service = {
        isLogged: fnIsLogged,

        securityToken: fnSecurityToken,
        setSecurityToken: fnSetSecurityToken,

        securityRefreshToken: fnSecurityRefreshToken,
        setSecurityRefreshToken: fnSetSecurityRefreshToken,

        currentUser: fnGetCurrentUser,
        setCurrentUser: fnSetCurrentUser,

        clearSession: fnClearSession


    };

    return self.service;

    function fnIsLogged() {
        if (logged === false) {
            return false;
        }
        else if(logged === true){
            return true;
        }
        else{
            sToken = localStorageService.get(tokenKey);
            logged = (typeof sToken !== 'undefined' && sToken !== null);
            return logged
        }
    }


    function fnSecurityToken() {
        if (!sToken) {
            sToken = localStorageService.get(tokenKey);
        }
        else{
            if (!localStorageService.get(tokenKey)) {
                fnSetSecurityToken(sToken)
            }
        }
        return sToken;
    }

    function fnSetSecurityToken(token) {
        sToken = token;
        localStorageService.set(tokenKey, sToken);
        logged = true;
    }

    function fnClearSession() {
        logged = false;
        localStorageService.remove(tokenKey);
        localStorageService.remove(refreshTKey);
        localStorageService.remove(currentUKey);

        sToken = null;
        rToken = null;
        currentUser = null;
    }


    function fnSecurityRefreshToken() {
        if (!rToken) {
            rToken = localStorageService.get(refreshTKey);
        }
        else {
            if (!localStorageService.get(refreshTKey)) {
                fnSetSecurityRefreshToken(rToken);
            }
        }

        return rToken;
    }

    function fnSetSecurityRefreshToken(refreshToken) {
        rToken = refreshToken;
        localStorageService.set(refreshTKey, rToken);
    }


    function fnSetCurrentUser(u) {
        currentUser = u;
        localStorageService.set(currentUKey, currentUser);
    }

    function fnGetCurrentUser() {
        if (!currentUser) {
            currentUser = localStorageService.get(currentUKey);
        }
        else{
            if(!localStorageService.get(currentUKey)){
                fnSetCurrentUser(currentUser)
            }
        }
        return currentUser;
    }

};

sessionSrv.$inject = ['baseSrv', 'systemSrv', 'localStorageService'];

angular.module('rrms')
    .service('sessionSrv', sessionSrv);
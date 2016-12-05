/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

(function () {

    var loginCtrl = function (indexSrv, sessionSrv, navigationSrv) {
        var vm = this;

        vm.wizard = {

            emailOrUsername: null,
            password: null,

            init: fnInit,
            login: fnLogin,
            logout: fnLogout
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            indexSrv.siteTile = 'Login'
        }

        function fnLogin(form) {
            if (form && form.$valid) {
                sessionSrv.setCurrentUser({email: vm.wizard.emailOrUsername});//todo js
                sessionSrv.setSecurityToken('axy');
                navigationSrv.goTo('/main');
            }
        }

        function fnLogout() {
            sessionSrv.setSecurityToken(null);
            navigationSrv.goTo('/login');
        }

    };

    loginCtrl.$inject = ['indexSrv', 'sessionSrv', 'navigationSrv'];

    angular.module('rrms')
        .controller('loginCtrl', loginCtrl);

})();
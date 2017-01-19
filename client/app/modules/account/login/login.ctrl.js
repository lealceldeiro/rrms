/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

(function () {

    var loginCtrl = function (indexSrv, sessionSrv, navigationSrv, systemSrv, loginSrv, ROUTE) {
        var vm = this;

        vm.wizard = {

            emailOrUsername: null,
            password: null,

            init: fnInit,
            login: fnLogin
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            indexSrv.siteTile = 'Login'
        }

        function fnLogin(form) {
            if (form && form.$valid) {
                loginSrv.login(vm.wizard.emailOrUsername, vm.wizard.password).then(
                    function (data) {
                        var e = systemSrv.evalAuth(data, false, false);
                        if (e) {
                            sessionSrv.setCurrentUser({
                                username: systemSrv.getAuthUser()
                            });
                            sessionSrv.setSecurityToken(systemSrv.getAuthToken());
                            sessionSrv.setSecurityRefreshToken(systemSrv.getAuthRefreshToken());
                            navigationSrv.goTo(ROUTE.MAIN);
                        }
                    }
                );
            }
        }

    };

    loginCtrl.$inject = ['indexSrv', 'sessionSrv', 'navigationSrv', 'systemSrv', 'loginSrv', 'ROUTE'];

    angular.module('rrms')
        .controller('loginCtrl', loginCtrl);

})();
/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

(function () {

    var loginCtrl = function (indexSrv, sessionSrv, navigationSrv, systemSrv) {
        var vm = this;
        const keyP = 'LOGIN';

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
                var fnKey = keyP + "fnLogin";
                sessionSrv.login(vm.wizard.emailOrUsername, vm.wizard.password).then(
                    function (data) {
                        var e = systemSrv.eval(data, fnKey, false, false);
                        if (e) {
                            sessionSrv.setCurrentUser({
                                username: systemSrv.getAuthUser(fnKey)
                            });
                            sessionSrv.setSecurityToken(systemSrv.getAuthToken(fnKey));
                            navigationSrv.goTo('/main');
                        }
                    }
                );
            }
        }

        function fnLogout() {
            sessionSrv.setSecurityToken(null);
            navigationSrv.goTo('/login');
        }

    };

    loginCtrl.$inject = ['indexSrv', 'sessionSrv', 'navigationSrv', 'systemSrv'];

    angular.module('rrms')
        .controller('loginCtrl', loginCtrl);

})();
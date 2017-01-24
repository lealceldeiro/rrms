/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

(function () {

    var loginCtrl = function (indexSrv, sessionSrv, navigationSrv, systemSrv, loginSrv, ROUTE, blockSrv) {
        var vm = this;
        const keyP = 'LOGIN__';

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
                blockSrv.block();
                loginSrv.login(vm.wizard.emailOrUsername, vm.wizard.password).then(
                    function (data) {
                        var e = systemSrv.evalAuth(data, false, false);
                        if (e) {
                            var key = "fnLogin" + keyP;
                            loginSrv.getLoginEntity().then(
                                function (data) {
                                    var e2 = systemSrv.eval(data, key, false,  true);
                                    if (e2) {
                                        sessionSrv.setCurrentOwnedEntity(systemSrv.getItem(key));
                                        blockSrv.unBlock();
                                        navigationSrv.goTo(ROUTE.MAIN);
                                    }
                                }
                            );

                            sessionSrv.setCurrentUser({username: systemSrv.getAuthUser()});
                            sessionSrv.setPermissions(systemSrv.gtAuthPermissions());
                            sessionSrv.setSecurityToken(systemSrv.getAuthToken());
                            sessionSrv.setSecurityRefreshToken(systemSrv.getAuthRefreshToken());
                        }
                    }
                );
            }
        }

    };

    loginCtrl.$inject = ['indexSrv', 'sessionSrv', 'navigationSrv', 'systemSrv', 'loginSrv', 'ROUTE', 'blockSrv'];

    angular.module('rrms')
        .controller('loginCtrl', loginCtrl);

})();
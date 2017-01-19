/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

(function () {

    var sessionCtrl = function (sessionSrv, navigationSrv, ROUTE, loginSrv) {
        var vm = this;

        vm.wizard = {
            init: fnInit,

            logout: fnLogout,
            isLogged: fnIsLogged,
            user: fnUser,
            go: goTo
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            sessionSrv.isLogged() ? navigationSrv.goTo(navigationSrv.DEFAULT_PATH) : navigationSrv.goTo(navigationSrv.LOGIN_PATH);
        }

        function fnLogout() {
            sessionSrv.clearSession();
            navigationSrv.goTo(ROUTE.LOGIN);

            /*loginSrv.logout().then(
                function (data) {
                    var e = true;//todo
                    if (e) {
                    }
                }
            );
            */
        }

        function fnIsLogged() {
            return sessionSrv.isLogged();
        }

        function fnUser() {
            return sessionSrv.currentUser();
        }

        function goTo(r) {
            navigationSrv.goTo(r);
        }

    };

    sessionCtrl.$inject = ['sessionSrv', 'navigationSrv', 'ROUTE', 'loginSrv'];

    angular.module('rrms')
        .controller('sessionCtrl', sessionCtrl);

})();
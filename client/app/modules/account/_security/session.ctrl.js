/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

(function () {

    var sessionCtrl = function (sessionSrv, navigationSrv, ROUTE) {
        var vm = this;

        vm.wizard = {
            init: fnInit,

            logout: fnLogout,
            go: goTo
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            if (sessionSrv.isLogged()) {
                vm.wizard.user = sessionSrv.currentUser();
                vm.wizard.permissions = sessionSrv.getPermissions();


                navigationSrv.goTo(navigationSrv.DEFAULT_PATH)
            }
            else{
                navigationSrv.goTo(navigationSrv.LOGIN_PATH);
            }
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

        function goTo(r) {
            navigationSrv.goTo(r);
        }

    };

    sessionCtrl.$inject = ['sessionSrv', 'navigationSrv', 'ROUTE'];

    angular.module('rrms')
        .controller('sessionCtrl', sessionCtrl);

})();
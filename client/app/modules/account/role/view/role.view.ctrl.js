/**
 * Created by Asiel on 11/9/2016.
 */

'use strict';

(function () {

    var roleViewCtrl = function (ROUTE, indexSrv, roleSrv, navigationSrv, notificationSrv, systemSrv) {
        var vm = this;
        const keyP = 'ROLE_VIEW';

        vm.wizard = {
            role: null,

            init: fnInit,
            cancel: fnCancel,
            edit: fnEdit,
            remove: fnRemove
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            var p = navigationSrv.currentParams();
            if (p && null !== p.id && typeof p.id !== 'undefined' && p.id != 'undefined'&& p.id != 'null') {
                vm.id = p.id;
                fnLoadData(p.id);
                indexSrv.siteTile = 'Ver Rol';
            }
            else{
                notificationSrv.showNotif(notificationSrv.utilText.mustSelectElement.es,
                    notificationSrv.utilText.titleError.es, notificationSrv.type.ERROR);
                navigationSrv.goTo(ROUTE.ROLES);
            }
        }

        function fnLoadData(id) {
            var fnKey = keyP + "fnLoadData";
            //get info
            roleSrv.show(id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    if (e) {
                        var it = systemSrv.getItem(fnKey);
                        if (it) {
                            vm.wizard.role = {
                                label: it.label,
                                description: it.description,
                                active: it.active
                            }
                        }
                    }
                }
            );
        }

        function fnRemove() {
            var fnKey = keyP + "fnRemove";
            roleSrv.remove(vm.id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, true, true);
                    if (e) {
                        navigationSrv.goTo(ROUTE.ROLES);
                    }
                }
            )
        }

        function fnCancel() {
            navigationSrv.goTo(ROUTE.ROLES);
        }

        function fnEdit() {
            navigationSrv.goTo(ROUTE.ROLE_EDIT, ROUTE.ROLE_EDIT_PL, vm.id);
        }

    };

    roleViewCtrl.$inject = ['ROUTE', 'indexSrv', 'roleSrv', 'navigationSrv', 'notificationSrv', 'systemSrv'];

    angular.module('rrms')
        .controller('roleViewCtrl', roleViewCtrl);

})();
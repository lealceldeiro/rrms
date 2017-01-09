/**
 * Created by Asiel on 11/9/2016.
 */

'use strict';

(function () {

    var roleEditCtrl = function (indexSrv, roleSrv, navigationSrv, ROUTE, systemSrv, notificationSrv) {
        var vm = this;
        const keyP = 'ROLE_EDIT';

        vm.wizard = {
            role: null,

            init: fnInit,
            cancel: fnCancel,
            save: fnSave
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            if (navigationSrv.currentPath() === ROUTE.ROLE_NEW) {
                indexSrv.siteTile = 'Nuevo Rol';
            }
            else {
                var p = navigationSrv.currentParams();
                if (p && null !== p.id && typeof p.id !== 'undefined' && p.id != 'undefined'&& p.id != 'null') {
                    vm.id = p.id;
                    fnLoadData(p.id);
                    indexSrv.siteTile = 'Editar Rol';
                }
                else{
                    notificationSrv.showNotif(notificationSrv.utilText.mustSelectElement.es,
                        notificationSrv.utilText.titleError.es, notificationSrv.type.ERROR);
                    navigationSrv.goTo(ROUTE.ROLES);
                }
            }
        }

        function fnLoadData(id) {
            var fnKey = keyP + "fnLoadData";
            //get info
            roleSrv.show(id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey,  false, true);
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

        function fnSave(form) {
            if (form && form.$valid) {
                var params = {
                    label : vm.wizard.role.label,
                    description : vm.wizard.role.description,
                    active : vm.wizard.role.active
                };

                var fnKey = keyP + "fnSave";
                roleSrv.save(params, vm.id).then(
                    function (data) {
                        var e = systemSrv.eval(data, fnKey, true, true);
                        if (e) {
                            fnCancel();
                        }
                    }
                )
            }
        }

        function fnCancel() {
            navigationSrv.goTo(ROUTE.ROLES);
        }


    };

    roleEditCtrl.$inject = ['indexSrv', 'roleSrv', 'navigationSrv', 'ROUTE', 'systemSrv', 'notificationSrv'];

    angular.module('rrms')
        .controller('roleEditCtrl', roleEditCtrl);

})();
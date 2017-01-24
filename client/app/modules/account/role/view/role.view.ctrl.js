/**
 * Created by Asiel on 11/9/2016.
 */

'use strict';

(function () {

    var roleViewCtrl = function (ROUTE, indexSrv, roleSrv, navigationSrv, notificationSrv, systemSrv, blockSrv) {
        var vm = this;
        const keyP = 'ROLE_VIEW';

        vm.wizard = {
            role: null,


            permissions: {
                itemsPerPage: 5,
                total: 0,
                offset: 0
            },

            init: fnInit,
            cancel: fnCancel,
            edit: fnEdit,
            remove: fnRemove,

            changePage: fnChangePage
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
                        vm.wizard.role = systemSrv.getItem(fnKey);
                    }
                }
            );

            _loadPermissions(id);
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

        function _loadPermissions(id) {
            var fnKey2 = keyP + "_loadPermissions";
            var offset = vm.wizard.permissions.offset;
            var max = vm.wizard.permissions.itemsPerPage;

            blockSrv.setIsLoading(vm.wizard.permissions.loading,true);
            roleSrv.permissionsByUser(id, offset, max).then(
                function (data) {
                    blockSrv.setIsLoading(vm.wizard.permissions.loading);
                    var e = systemSrv.eval(data, fnKey2, false, true);
                    if (e) {
                        vm.wizard.permissions.all = systemSrv.getItems(fnKey2);
                        vm.wizard.permissions.total = systemSrv.getTotal(fnKey2);
                    }
                }
            )
        }


        function fnChangePage(newPageNumber) {
            if (typeof newPageNumber == 'undefined' || newPageNumber < 1 || newPageNumber == null) {
                newPageNumber = 1;
            }
            vm.wizard.permissions.offset = (newPageNumber - 1) * vm.wizard.permissions.itemsPerPage;

            _loadPermissions(vm.id);
        }

    };

    roleViewCtrl.$inject = ['ROUTE', 'indexSrv', 'roleSrv', 'navigationSrv', 'notificationSrv', 'systemSrv', 'blockSrv'];

    angular.module('rrms')
        .controller('roleViewCtrl', roleViewCtrl);

})();
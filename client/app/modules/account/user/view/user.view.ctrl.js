/**
 * Created by Asiel on 23/12/2016.
 */

'use strict';

(function () {

    var f = function (ROUTE, indexSrv, userSrv, navigationSrv, notificationSrv, systemSrv) {
        var vm = this;
        const keyP = 'USER_VIEW';

        vm.wizard = {
            entity: null,

            roles: {
                itemsPerPage: 5,
                total: 0
            },

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
                indexSrv.siteTile = 'Ver Usuario';
            }
            else{
                notificationSrv.showNotif(notificationSrv.utilText.mustSelectElement.es,
                    notificationSrv.utilText.titleError.es, notificationSrv.type.ERROR);
                navigationSrv.goTo(ROUTE.USERS);
            }
        }

        function fnLoadData(id) {
            var fnKey = keyP + "fnLoadData1";
            var fnKey2 = keyP + "fnLoadData2";
            //get info
            userSrv.show(id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    if (e) {
                        vm.wizard.entity = systemSrv.getItem(fnKey);
                    }
                }
            );
            userSrv.rolesByUser(id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey2, false, true);
                    if (e) {
                        vm.wizard.roles.all = systemSrv.getItems(fnKey2);
                        vm.wizard.roles.total = systemSrv.getTotal(fnKey2);
                    }
                }
            )
        }

        function fnRemove() {
            var fnKey = keyP + "fnRemove";
            userSrv.remove(vm.id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, true, true);
                    if (e) {
                        navigationSrv.goTo(ROUTE.USERS);
                    }
                }
            )
        }

        function fnCancel() {
            navigationSrv.goTo(ROUTE.USERS);
        }

        function fnEdit() {
            navigationSrv.goTo(ROUTE.USER_EDIT, ROUTE.USER_EDIT_PL, vm.id);
        }

    };

    f.$inject = ['ROUTE', 'indexSrv', 'userSrv', 'navigationSrv', 'notificationSrv', 'systemSrv'];

    angular.module('rrms')
        .controller('userViewCtrl', f);

})();
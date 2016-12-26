/**
 * Created by Asiel on 23/12/2016.
 */

'use strict';

(function () {

    var f = function (ROUTE, indexSrv, userSrv, navigationSrv, notificationSrv, systemSrv) {
        var vm = this;

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
            //get info
            userSrv.show(id).then(
                function (data) {
                    var e = systemSrv.eval(data, false, true);
                    if (e) {
                        vm.wizard.entity = systemSrv.apiItem;
                        userSrv.rolesByUser(id).then(
                            function (data) {
                                var e = systemSrv.eval(data, false, true);
                                if (e) {
                                    vm.wizard.roles.all = systemSrv.apiItems;
                                    vm.wizard.roles.total = systemSrv.apiTotalCount;
                                }
                            }
                        )
                    }
                }
            );
        }

        function fnRemove() {
            userSrv.remove(vm.id).then(
                function (data) {
                    var e = systemSrv.eval(data, true, true);
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
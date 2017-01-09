/**
 * Created by Asiel on 11/9/2016.
 */

'use strict';

(function () {

    var roleListCtrl = function (indexSrv, systemSrv, roleSrv, navigationSrv, paginationSrv, ROUTE, searchSrv) {
        var vm = this;
        const keyP = 'ROLE_LIST';

        vm.wizard = {
            roles: {
                all: []
            },
            init: fnInit,

            changePage: fnChangePage,
            search: fnSearch,
            view: fnView,
            remove: fnRemove,
            new: fnNew,
            edit: fnEdit
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            indexSrv.siteTile = 'Roles';
            paginationSrv.resetPagination();
            vm.wizard.search();
        }

        function fnSearch() {
            vm.wizard.roles.all = [];
            var offset = paginationSrv.getOffset();
            var max = paginationSrv.getItemsPerPage();

            var fnKey = keyP + "fnSearch";

            roleSrv.search(offset, max).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    if (e) {
                        paginationSrv.setTotalItems(systemSrv.getTotal(fnKey));
                        var it = systemSrv.getItems(fnKey);
                        if (it) {
                            vm.wizard.roles.all = it;
                        }
                    }
                }
            );
        }

        function fnEdit(id) {
            navigationSrv.goTo(ROUTE.ROLE_EDIT, ROUTE.ROLE_EDIT_PL, id);
        }

        function fnView(id) {
            navigationSrv.goTo(ROUTE.ROLE_VIEW, ROUTE.ROLE_VIEW_PL, id);
        }

        function fnNew() {
            navigationSrv.goTo(ROUTE.ROLE_NEW);
        }

        function fnRemove(id) {
            var fnKey = keyP + "fnRemove";
            roleSrv.remove(id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, true, true);
                    if (e) {
                        var idx = searchSrv.indexOf(vm.wizard.roles.all, 'id', id);
                        if (idx !== -1) {
                            vm.wizard.roles.all.splice(idx,1);
                            fnSearch();
                        }
                    }
                }
            )
        }

        function fnUndoRemove() {

        }

        function fnChangePage(newPageNumber) {
            paginationSrv.moveTo(newPageNumber);
            vm.wizard.search();
        }

    };

    roleListCtrl.$inject = ['indexSrv', 'systemSrv', 'roleSrv', 'navigationSrv', 'paginationSrv', 'ROUTE', 'searchSrv'];

    angular.module('rrms')
        .controller('roleListCtrl', roleListCtrl);

})();
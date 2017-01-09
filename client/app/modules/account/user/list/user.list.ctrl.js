/**
 * Created by Asiel on 12/22/2016.
 */

'use strict';

(function () {

    var f = function (indexSrv, systemSrv, userSrv, navigationSrv, paginationSrv, ROUTE, searchSrv) {
        var vm = this;
        const keyP = 'USER_LIST';

        vm.wizard = {
            entities: {
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
            indexSrv.siteTile = 'Usuarios';
            paginationSrv.resetPagination();
            vm.wizard.search();
        }

        function fnSearch() {
            vm.wizard.entities.all = [];
            var offset = paginationSrv.getOffset();
            var max = paginationSrv.getItemsPerPage();

            var fnKey = keyP + "fnSearch";

            userSrv.search(offset, max).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    if (e) {
                        paginationSrv.setTotalItems(systemSrv.getTotal(fnKey));
                        var it = systemSrv.getItems(fnKey);
                        if (it) {
                            vm.wizard.entities.all = it;
                        }
                    }
                }
            );
        }

        function fnEdit(id) {
            navigationSrv.goTo(ROUTE.USER_EDIT, ROUTE.USER_EDIT_PL, id);
        }

        function fnView(id) {
            navigationSrv.goTo(ROUTE.USER_VIEW, ROUTE.USER_VIEW_PL, id);
        }

        function fnNew() {
            navigationSrv.goTo(ROUTE.USER_NEW);
        }

        function fnRemove(id) {
            var fnKey = keyP + "fnRemove";
            userSrv.remove(id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, true, true);
                    if (e) {
                        var idx = searchSrv.indexOf(vm.wizard.entities.all, 'id', id);
                        if (idx !== -1) {
                            vm.wizard.entities.all.splice(idx,1);
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

    f.$inject = ['indexSrv', 'systemSrv', 'userSrv', 'navigationSrv', 'paginationSrv', 'ROUTE', 'searchSrv'];

    angular.module('rrms')
        .controller('userListCtrl', f);

})();
/**
 * Created by Asiel on 11/9/2016.
 */

'use strict';

(function () {

    var roleListCtrl = function (indexSrv, systemSrv, roleSrv, navigationSrv, paginationSrv, ROUTE, notificationSrv) {
        var vm = this;

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
            vm.wizard.search();
        }

        function fnSearch() {
            vm.wizard.roles.all = [];
            var offset = paginationSrv.getOffset();
            var max = paginationSrv.getItemsPerPage();

            roleSrv.search(offset, max).then(
                function (data) {
                    var e = systemSrv.eval(data);
                    if (!e) {
                        notificationSrv.showNotif(systemSrv.apiMessage, notificationSrv.utilText.titleError.es,
                            notificationSrv.type.ERROR);
                    }
                    else{
                        paginationSrv.setTotalItems(systemSrv.apiTotalCount);
                        if (systemSrv.apiItems) {
                            vm.wizard.roles.all = systemSrv.apiItems;
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

        function fnRemove() {
            notificationSrv.showNotif("test", "message",
                notificationSrv.type.SUCCESS);
        }

        function fnUndoRemove() {

        }

        function fnChangePage(newPageNumber) {
            paginationSrv.moveTo(newPageNumber);
            vm.wizard.search();
        }

    };

    roleListCtrl.$inject = ['indexSrv', 'systemSrv', 'roleSrv', 'navigationSrv', 'paginationSrv', 'ROUTE', 'notificationSrv'];

    angular.module('rrms')
        .controller('roleListCtrl', roleListCtrl);

})();
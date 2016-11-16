/**
 * Created by Asiel on 11/9/2016.
 */

'use strict';

(function () {

    var roleListCtrl = function (indexSrv, roleSrv, navigationSrv, paginationSrv, ROUTE, notificationSrv) {
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

        //todo: REMOVE
        function getMockedData(offset, max) {
            var a = [];
            var init = offset >= 0 ? offset : 0;
            for(var i = init; i < 167; i++){
                if (i - offset == max) {
                    break;
                }
                a.push(
                    {
                        id: i,
                        label: 'Role Mock ' + i,
                        description: 'Short description of role ' + i,
                        active: i % 2 === 0
                    }
                );
            }
            return {
                list: a,
                total: 167
            }
        }

        function fnSearch() {
            var offset = paginationSrv.getOffset();
            var max = paginationSrv.getItemsPerPage();
            var r = getMockedData(offset, max);

            paginationSrv.setTotalItems(r.total);
            vm.wizard.roles.all = r.list;

        }

        function fnEdit(id) {
            navigationSrv.goTo('/roles/' + id + '/edit');
        }

        function fnView(id) {
            navigationSrv.goTo('/roles/' + id + '/view');
        }

        function fnNew() {
            navigationSrv.goTo(ROUTE.ROLE_NEW);
        }

        function fnRemove() {
            notificationSrv.show(notificationSrv.type.WARNING, 'Información', 'Rol eliminado correctamente.', fnUndoRemove, "Deshacer");
        }

        function fnUndoRemove() {
            notificationSrv.show(notificationSrv.type.SUCCESS, 'Información', 'Rol recuperado correctamente.');
        }

        function fnChangePage(newPageNumber) {
            paginationSrv.moveTo(newPageNumber);
            vm.wizard.search();
        }

    };

    roleListCtrl.$inject = ['indexSrv', 'roleSrv', 'navigationSrv', 'paginationSrv', 'ROUTE', 'notificationSrv'];

    angular.module('rrms')
        .controller('roleListCtrl', roleListCtrl);

})();
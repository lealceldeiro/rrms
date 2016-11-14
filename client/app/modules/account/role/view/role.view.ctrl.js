/**
 * Created by Asiel on 11/9/2016.
 */

'use strict';

(function () {

    var roleViewCtrl = function (indexSrv, roleSrv, navigationSrv) {
        var vm = this;

        vm.wizard = {
            role: null,

            init: fnInit,
            cancel: fnCancel,
            edit: fnEdit
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
                //todo inform error
                fnCancel();
            }

        }

        function fnLoadData(id) {
            //get info

            //if doesn't exist, inform error
            //todo: remove next line
            vm.wizard.role = {id: id, label: "Example Role Label",  description: "Example Role Description", active: true};
        }

        function fnCancel() {
            navigationSrv.back();
        }

        function fnEdit() {
            navigationSrv.goTo('/roles/' + vm.id + '/edit');
        }

    };

    roleViewCtrl.$inject = ['indexSrv', 'roleSrv', 'navigationSrv'];

    angular.module('rrms')
        .controller('roleViewCtrl', roleViewCtrl);

})();
/**
 * Created by Asiel on 11/9/2016.
 */

'use strict';

(function () {

    var roleEditCtrl = function (indexSrv, roleSrv, navigationSrv, ROUTE) {
        var vm = this;
        var newMode = false;

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
                newMode = true;
                indexSrv.siteTile = 'Nuevo Rol';
            }
            else {
                var p = navigationSrv.currentParams();
                if (p && null !== p.id && typeof p.id !== 'undefined' && p.id != 'undefined'&& p.id != 'null') {
                    fnLoadData(1);
                    indexSrv.siteTile = 'Editar Rol';
                }
                else{
                    //todo inform error
                    fnCancel();
                }
            }
        }

        function fnLoadData(id) {
            //get info

            //if doesn't exist, inform error
            vm.wizard.role = {id: id, label: "Example Role Label",  description: "Example Role Description", active: true};
        }

        function fnSave(form) {
            if (form && form.$valid) {

                if (newMode) {

                }
                else{

                }

            }
        }
        function fnCancel() {
            navigationSrv.back();
        }


    };

    roleEditCtrl.$inject = ['indexSrv', 'roleSrv', 'navigationSrv', 'ROUTE'];

    angular.module('rrms')
        .controller('roleEditCtrl', roleEditCtrl);

})();
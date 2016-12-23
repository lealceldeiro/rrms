/**
 * Created by Asiel on 23/12/2016.
 */

'use strict';

(function () {

    var f = function (indexSrv, userSrv, navigationSrv, ROUTE, systemSrv, notificationSrv) {
        var vm = this;

        vm.wizard = {
            entity: null,

            init: fnInit,
            cancel: fnCancel,
            save: fnSave
        };

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            if (navigationSrv.currentPath() === ROUTE.USER_NEW) {
                indexSrv.siteTile = 'Nuevo Usuario';
            }
            else {
                var p = navigationSrv.currentParams();
                if (p && null !== p.id && typeof p.id !== 'undefined' && p.id != 'undefined'&& p.id != 'null') {
                    vm.id = p.id;
                    fnLoadData(p.id);
                    indexSrv.siteTile = 'Editar Usuario';
                }
                else{
                    notificationSrv.showNotif(notificationSrv.utilText.mustSelectElement.es,
                        notificationSrv.utilText.titleError.es, notificationSrv.type.ERROR);
                    navigationSrv.goTo(ROUTE.USERS);
                }
            }
        }

        function fnLoadData(id) {
            //get info
            userSrv.show(id).then(
                function (data) {
                    var e = systemSrv.eval(data);
                    if (!e) {
                        notificationSrv.showNotif(systemSrv.apiMessage, notificationSrv.utilText.titleError.es,
                            notificationSrv.type.ERROR);
                    }
                    else {
                        vm.wizard.entity = systemSrv.apiItem
                    }
                }
            );
        }

        function fnSave(form) {
            if (form && form.$valid) {
                var params = {
                    username : vm.wizard.entity.username, //readonly right now
                    name : vm.wizard.entity.name,
                    email : vm.wizard.entity.email,
                    password : vm.wizard.entity.password
                    //roles: //todo
                };

                userSrv.save(params, vm.id).then(
                    function (data) {
                        var e = systemSrv.eval(data);
                        if (!e) {
                            notificationSrv.showNotif(systemSrv.apiMessage, notificationSrv.utilText.titleError.es,
                                notificationSrv.type.ERROR);
                        }
                        else {
                            notificationSrv.showNotif(systemSrv.apiMessage, notificationSrv.utilText.titleSccess.es,
                                notificationSrv.type.SUCCESS);
                            fnCancel();
                        }
                    }
                )
            }
        }

        function fnCancel() {
            navigationSrv.goTo(ROUTE.USERS);
        }
    };

    f.$inject = ['indexSrv', 'userSrv', 'navigationSrv', 'ROUTE', 'systemSrv', 'notificationSrv'];

    angular.module('rrms')
        .controller('userEditCtrl', f);

})();
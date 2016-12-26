/**
 * Created by Asiel on 23/12/2016.
 */

'use strict';

(function () {

    var f = function (indexSrv, userSrv, navigationSrv, ROUTE, systemSrv, notificationSrv, valueSrv, roleSrv) {
        var vm = this;

        var flagSearch = false;
        var rolesLoadedAlready = false;

        vm.wizard = {
            entity: null,

            roles: {

                offset: 0,
                max: 8,
                maxLinks: 5,

                all: [],
                selected: null
            },

            setIsSearching: fnSetIsSearching,
            searchRoles: fnSearchRoles,

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

                _loadRoles();
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
                    var e = systemSrv.eval(data, false, true);
                    if (e) {
                        vm.wizard.entity = systemSrv.apiItem;

                        _loadRoles(id);
                    }
                }
            );
        }

        function fnSave(form) {
            if (form && form.$valid) {
                var params = {
                    username : vm.wizard.entity.username,
                    name : vm.wizard.entity.name,
                    email : vm.wizard.entity.email,
                    password : vm.wizard.entity.password,
                    roles: []
                };
                angular.forEach(vm.wizard.roles.selected, function (element) {
                    params.roles.push(element.id)
                });

                userSrv.save(params, vm.id).then(
                    function (data) {
                        var e = systemSrv.eval(data, true, true);
                        if (e) {
                            fnCancel();
                        }
                    }
                )
            }
        }

        function fnCancel() {
            navigationSrv.goTo(ROUTE.USERS);
        }

        function _loadRoles(id, criteria) {
            vm.wizard.roles.all = [];
            if (!rolesLoadedAlready && valueSrv.nNnN(id)) {
                vm.wizard.roles.selected = null;
            }

            roleSrv.search(vm.wizard.roles.offset, vm.wizard.roles.max, criteria).then(
                function (data) {
                    var e = systemSrv.eval(data, false, true);
                    if (e) {
                        vm.wizard.roles.all = systemSrv.apiItems;
                        if (valueSrv.nNnN(id) && !rolesLoadedAlready) {
                            userSrv.rolesByUser(id, vm.wizard.roles.offset, vm.wizard.roles.max).then(
                                function (data) {
                                    e = systemSrv.eval(data, false, true);
                                    if (e) {
                                        rolesLoadedAlready = true;
                                        vm.wizard.roles.selected = systemSrv.apiItems;
                                    }
                                }
                            )
                        }
                    }
                }
            )
        }

        function fnSearchRoles(criteria) {
            if (flagSearch) {
                _loadRoles(vm.id, criteria);
            }
        }

        function fnSetIsSearching(s) {
            flagSearch = s === true;
            if (!flagSearch) {
                _loadRoles(vm.id);
            }
        }
    };

    f.$inject = ['indexSrv', 'userSrv', 'navigationSrv', 'ROUTE', 'systemSrv', 'notificationSrv', 'valueSrv', 'roleSrv'];

    angular.module('rrms')
        .controller('userEditCtrl', f);

})();
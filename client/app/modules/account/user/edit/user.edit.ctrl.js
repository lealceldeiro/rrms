/**
 * Created by Asiel on 23/12/2016.
 */

'use strict';

(function () {

    var f = function (indexSrv, userSrv, navigationSrv, ROUTE, systemSrv, notificationSrv, roleSrv, blockSrv, sessionSrv) {
        var vm = this;
        const keyP = 'USER_EDIT';

        var flagSearch = false;
        var rolesLoadedAlready = false;

        vm.wizard = {
            entity: {},

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
                vm.wizard.entity = null;
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
            var fnKey = keyP + "fnLoadData";
            //get info
            userSrv.show(id).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    if (e) {
                        vm.wizard.entity = systemSrv.getItem(fnKey);
                    }
                }
            );
            _loadRolesInitial(id);
        }

        function fnSave(form) {
            if (form && form.$valid) {
                var le = sessionSrv.loginEntity();
                blockSrv.block();
                var params = {
                    username : vm.wizard.entity.username,
                    name : vm.wizard.entity.name,
                    email : vm.wizard.entity.email,
                    password : vm.wizard.entity.password,
                    roles: [],
                    entity: le ? le.id : 0
                };
                var fnKey = keyP + "fnSave";
                angular.forEach(vm.wizard.roles.selected, function (element) {
                    params.roles.push(element.id)
                });

                userSrv.save(params, vm.id).then(
                    function (data) {
                        blockSrv.unBlock();
                        var e = systemSrv.eval(data, fnKey, true, true);
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

        function _loadRoles(criteria) {
            vm.wizard.roles.all = [];

            var fnKey = keyP + "_loadRoles";

            roleSrv.search(0, 0, criteria).then(
                function (data) {
                    var e = systemSrv.eval(data, fnKey, false, true);
                    if (e) {
                        vm.wizard.roles.all = systemSrv.getItems(fnKey);
                    }
                }
            )
        }

        function _loadRolesInitial(id, criteria) {
            vm.wizard.roles.all = [];
            var fnKey = keyP + "_loadRolesInitial";

            var ent = sessionSrv.loginEntity();

            userSrv.rolesByUser(id, ent ? ent.id : 0, vm.wizard.roles.offset, vm.wizard.roles.max).then(
                function (data) {
                    var fnKey2 = fnKey + "2";
                    var e = systemSrv.eval(data, fnKey2, false, true);
                    if (e) {
                        rolesLoadedAlready = true;
                        vm.wizard.roles.selected = systemSrv.getItems(fnKey2);

                        roleSrv.search(0, 0, criteria).then(    //zero for avoiding issue with ui-select filtering
                            function (data) {
                                var e = systemSrv.eval(data, fnKey, false, true);
                                if (e) {
                                    vm.wizard.roles.all = systemSrv.getItems(fnKey);
                                }
                            }
                        )
                    }
                }
            )
        }

        function fnSearchRoles(criteria) {
            if (flagSearch) {
                _loadRoles(criteria);
            }
        }

        function fnSetIsSearching(s) {
            flagSearch = s === true;
            if (!flagSearch) {
                _loadRoles();
            }
        }
    };

    f.$inject = ['indexSrv', 'userSrv', 'navigationSrv', 'ROUTE', 'systemSrv', 'notificationSrv', 'roleSrv',
        'blockSrv', 'sessionSrv'];

    angular.module('rrms')
        .controller('userEditCtrl', f);

})();
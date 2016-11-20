/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var roleSrv = function (systemSrv, $http) {
    var self = this;
    var rolesUrl = systemSrv.APIUrl + 'role/';

    self.service = {
        search: fnSearch
    };

    return self.service;

    //
    function fnSearch() {
        return $http.get(rolesUrl + 'list/').then(
            function (res) {
                return res.data;
            },
            function (resOnErr) {
                return resOnErr.data;
            }
        )
    }
};

roleSrv.$inject = ['systemSrv', '$http'];

angular.module('rrms')
    .service('roleSrv', roleSrv);
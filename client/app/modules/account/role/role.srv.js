/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var roleSrv = function (systemSrv, $http, valueSrv) {
    var self = this;
    var rolesUrl = systemSrv.APIUrl + 'role/';

    self.service = {
        search: fnSearch
    };

    return self.service;

    //
    function fnSearch(offset, max) {
        var params = valueSrv.nNnN(offset) ? "?offset=" + offset : "";
        if (valueSrv.nNnN(max)) {
            params += params === ""? "?max=" + max : "&max=" + max;
        }

        return $http.get(rolesUrl + 'search/' + params).then(
            function (res) {
                return res.data;
            },
            function (resOnErr) {
                return resOnErr.data;
            }
        )
    }
};

roleSrv.$inject = ['systemSrv', '$http', 'valueSrv'];

angular.module('rrms')
    .service('roleSrv', roleSrv);
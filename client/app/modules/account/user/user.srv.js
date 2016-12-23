/**
 * Created by Asiel on 22/12/2016.
 */

'use strict';

var f = function (systemSrv, $http, valueSrv, dataSrv) {
    var self = this;
    var url = systemSrv.APIUrl + 'user/';

    self.service = {
        search: fnSearch,
        show: fnShow,
        remove: fnRemove,
        save: fnSave,

        rolesByUser: fnRolesByUser
    };

    return self.service;

    function fnSearch(offset, max) {
        var params = valueSrv.nNnN(offset) ? "?offset=" + offset : "";
        if (valueSrv.nNnN(max)) {
            params += params === ""? "?max=" + max : "&max=" + max;
        }

        return $http.get(url + 'search' + params).then(
            function (res) {
                return res.data;
            },
            function (resOnErr) {
                return resOnErr.data;
            }
        )
    }

    function fnRemove(id) {
        return $http.delete(url + 'delete/' + id).then(
            function (res) {
                return res.data
            },
            function (resOnErr) {
                return resOnErr.data
            }
        )
    }

    function fnShow(id) {
        return $http.get(url + "show/" + id).then(
            function (res) {
                return res.data
            },
            function (resOnError) {
                return resOnError.data
            }
        )
    }

    function fnSave(params, id) {
        var murl = url + 'save' + (typeof id !== 'undefined' && id != null && !isNaN(id) ? '/' + id : '');
        var d = dataSrv.processParamsAsObject(params);

        return $http.post(murl, d).then(
            function (res) {
                return res.data;
            },
            function (resOnError) {
                return resOnError.data;
            }
        )
    }

    function fnRolesByUser(id, offset, max) {
        var params = valueSrv.nNnN(offset) ? "?offset=" + offset : "";
        if (valueSrv.nNnN(max)) {
            params += params === ""? "?max=" + max : "&max=" + max;
        }

        return $http.get(url + 'roles/' + id + params).then(
            function (res) {
                return res.data;
            },
            function (resOnErr) {
                return resOnErr.data;
            }
        )
    }
};

f.$inject = ['systemSrv', '$http', 'valueSrv', 'dataSrv'];

angular.module('rrms')
    .service('userSrv', f);
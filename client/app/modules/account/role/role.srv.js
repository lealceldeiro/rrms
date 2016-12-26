/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var roleSrv = function (systemSrv, $http, valueSrv, dataSrv) {
    var self = this;
    var rolesUrl = systemSrv.APIUrl + 'role/';

    self.service = {
        search: fnSearch,
        show: fnShow,
        remove: fnRemove,
        save: fnSave
    };

    return self.service;

    /**
     * Search for role
     * @param offset offset for paging
     * @param max max offset for paging
     * @returns {*} Promise
     */
    function fnSearch(offset, max, criteria) {
        var params = valueSrv.nNnN(offset) ? "?offset=" + offset : "";
        if (valueSrv.nNnN(max)) {
            params += params === ""? "?max=" + max : "&max=" + max;
        }
        if (valueSrv.nNnN(criteria)) {
            params += params === ""? "?q=" + criteria : "&q=" + criteria;
        }

        return $http.get(rolesUrl + 'search' + params).then(
            function (res) {
                return res.data;
            },
            function (resOnErr) {
                return resOnErr.data;
            }
        )
    }

    function fnRemove(id) {
        return $http.delete(rolesUrl + 'delete/' + id).then(
            function (res) {
                return res.data
            },
            function (resOnErr) {
                return resOnErr.data
            }
        )
    }

    function fnShow(id) {
        return $http.get(rolesUrl + "show/" + id).then(
            function (res) {
                return res.data
            },
            function (resOnError) {
                return resOnError.data
            }
        )
    }

    function fnSave(params, id) {
        var url = rolesUrl + 'save' + (typeof id !== 'undefined' && id != null && !isNaN(id) ? '/' + id : '');
        var d = dataSrv.processParamsAsObject(params);

        return $http.post(url, d).then(
            function (res) {
                return res.data;
            },
            function (resOnError) {
                return resOnError.data;
            }
        )
    }
};

roleSrv.$inject = ['systemSrv', '$http', 'valueSrv', 'dataSrv'];

angular.module('rrms')
    .service('roleSrv', roleSrv);
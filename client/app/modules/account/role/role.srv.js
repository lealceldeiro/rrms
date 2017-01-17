/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var roleSrv = function (systemSrv, $http, valueSrv, dataSrv, baseSrv) {
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
     * @param criteria criteria for searching
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

        var def =  $http.get(rolesUrl + params);
        return baseSrv.resolveDeferred(def);
    }

    function fnRemove(id) {
        var def = $http.delete(rolesUrl + id);
        return baseSrv.resolveDeferred(def);
    }

    function fnShow(id) {
        var def = $http.get(rolesUrl + id);
        return baseSrv.resolveDeferred(def);
    }

    function fnSave(params, id) {
        var url = rolesUrl;

        if (typeof id !== 'undefined' && id != null && !isNaN(id)) {//update?
            url = rolesUrl + 'update/' + id ;
            var def = $http.post(url, params);
        }
        else {//create?
            def = $http.put(url, params);
        }
        return baseSrv.resolveDeferred(def);
    }
};

roleSrv.$inject = ['systemSrv', '$http', 'valueSrv', 'dataSrv', 'baseSrv'];

angular.module('rrms')
    .service('roleSrv', roleSrv);
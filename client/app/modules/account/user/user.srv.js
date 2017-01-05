/**
 * Created by Asiel on 22/12/2016.
 */

'use strict';

var f = function (systemSrv, $http, valueSrv, dataSrv, baseSrv) {
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

        var def = $http.get(url + 'search' + params);
        return baseSrv.resolveDeferred(def);
    }

    function fnRemove(id) {
        var def = $http.delete(url + 'delete/' + id);
        return baseSrv.resolveDeferred(def);
    }

    function fnShow(id) {
        var def = $http.get(url + "show/" + id);
        return baseSrv.resolveDeferred(def);
    }

    function fnSave(params, id) {
        var murl = url + 'save' + (typeof id !== 'undefined' && id != null && !isNaN(id) ? '/' + id : '');
        var d = dataSrv.processParamsAsObject(params);

        var def = $http.post(murl, d);
        return baseSrv.resolveDeferred(def);
    }

    function fnRolesByUser(id, offset, max) {
        var params = valueSrv.nNnN(offset) ? "?offset=" + offset : "";
        if (valueSrv.nNnN(max)) {
            params += params === ""? "?max=" + max : "&max=" + max;
        }

        var def = $http.get(url + 'roles/' + id + params);
        return baseSrv.resolveDeferred(def);
    }
};

f.$inject = ['systemSrv', '$http', 'valueSrv', 'dataSrv', 'baseSrv'];

angular.module('rrms')
    .service('userSrv', f);
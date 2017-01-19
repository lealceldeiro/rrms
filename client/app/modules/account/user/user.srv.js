/**
 * Created by Asiel on 22/12/2016.
 */

'use strict';

var f = function (systemSrv, $http, valueSrv, dataSrv, baseSrv) {
    var self = this;
    var url = systemSrv.APIAbsoluteUrl + 'user/';

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

        var def = $http.get(url + params);
        return baseSrv.resolveDeferred(def);
    }

    function fnRemove(id) {
        var def = $http.delete(url + id);
        return baseSrv.resolveDeferred(def);
    }

    function fnShow(id) {
        var def = $http.get(url + id);
        return baseSrv.resolveDeferred(def);
    }

    function fnSave(params, id) {
        var mUrl = url;

        if (typeof id !== 'undefined' && id != null && !isNaN(id)) {//update?
            mUrl = url + id ;
            var def = $http.post(mUrl, params);
        }
        else {//create?
            def = $http.put(mUrl, params);
        }

        return baseSrv.resolveDeferred(def);
    }

    function fnRolesByUser(id, offset, max) {
        var params = valueSrv.nNnN(offset) ? "?offset=" + offset : "";
        if (valueSrv.nNnN(max)) {
            params += params === ""? "?max=" + max : "&max=" + max;
        }

        var def = $http.get(url + id + '/roles/' + params);
        return baseSrv.resolveDeferred(def);
    }
};

f.$inject = ['systemSrv', '$http', 'valueSrv', 'dataSrv', 'baseSrv'];

angular.module('rrms')
    .service('userSrv', f);
/**
 * Created by Asiel on 12/21/2016.
 */

'use strict';

var f = function () {

    var self = this;

    const types = {
        "object": "object",
        "array": "array"
    };

    self.service = {
        processParamsAsObject: fnProcessParametersAsObject,
        processParamsAsArray: fnProcessParametersAsArray
    };

    return self.service;

    //fn
    function fnProcessParametersAsObject(params) {
        return _process(params, types.object);
    }
    function fnProcessParametersAsArray(params) {
        return _process(params, types.array);
    }

    function _process(params, type) {
        var d = type === types.object ? {} : [];
        if (params) {
            for(var k in params){
                if (params.hasOwnProperty(k)) {
                    d[k] = params[k];
                }
            }
        }
        return d
    }

};

f.$inject = [];

angular
    .module('rrms')
    .service('dataSrv', f);
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
    /**
     * Process parameters for concatenating them as a list of parameters for web services that need those parameters to be
     * repeated on the request in order to process them as a list. This returns the response as an object
     * @param params parameters to be processed
     * @returns {*}
     */
    function fnProcessParametersAsObject(params) {
        return _process(params, types.object);
    }
    /**
     * Process parameters for concatenating them as a list of parameters for web services that need those parameters to be
     * repeated on the request in order to process them as a list. This returns the response as an array
     * @param params parameters to be processed
     * @returns {*}
     */
    function fnProcessParametersAsArray(params) {
        return _process(params, types.array);
    }

    /**
     * Process parameters for concatenating them as a list of parameters for web services that need those parameters to be
     * repeated on the request in order to process them as a list
     * @param params parameters to be processed
     * @param type type of response desired
     * @returns {*}
     * @private
     */
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
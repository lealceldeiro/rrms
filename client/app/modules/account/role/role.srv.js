/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var roleSrv = function (systemSrv) {
    var self = this;
    var apiurl = systemSrv.getAPIUrl();

    self.service = {
        list: []
    };

    return self.service;

    //
    function fnGetList() {

    }
};

roleSrv.$inject = ['systemSrv'];

angular.module('rrms')
    .service('roleSrv', roleSrv);
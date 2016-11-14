/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var roleSrv = function () {
    var vm = this;


    vm.service = {
    };

    return vm.service;
};

roleSrv.$inject = [];

angular.module('rrms')
    .service('roleSrv', roleSrv);
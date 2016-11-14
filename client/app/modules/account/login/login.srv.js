/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var loginSrv = function () {
    var vm = this;


    vm.service = {
        siteTile: ''
    };

    return vm.service;
};

loginSrv.$inject = [];

angular.module('rrms')
    .service('loginSrv', loginSrv);
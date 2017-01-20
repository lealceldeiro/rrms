/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

(function () {

    var indexCtrl = function ($scope, indexSrv, sessionSrv) {
        var vm = this;

        vm.wizard = {
            init: fnInit,
            isLogged: fnIsLogged,

            siteTitle: fnSiteTitle
        };

        $scope.$watch(function () {return vm.wizard.siteTitle();},function (nVal, oVal) {});

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            indexSrv.siteTile = 'Index';
        }

        function fnSiteTitle() {
            return indexSrv.siteTile;
        }

        function fnIsLogged() {
            return sessionSrv.isLogged();
        }

    };

    indexCtrl.$inject = ['$scope', 'indexSrv', 'sessionSrv'];

    angular.module('rrms')
        .controller('indexCtrl', indexCtrl);

})();
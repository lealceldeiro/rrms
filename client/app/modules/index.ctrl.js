/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

(function () {

    var indexCtrl = function ($scope, indexSrv) {
        var vm = this;

        vm.wizard = {
            init: fnInit,

            siteTitle: fnSiteTitle
        };

        $scope.$watch(function () {return vm.wizard.siteTitle();},function (nVal, oVal) {});

        vm.wizard.init();

        return vm.wizard;

        //fn
        function fnInit() {
            indexSrv.siteTile = 'Index'
        }

        function fnSiteTitle() {
            return indexSrv.siteTile;
        }

    };

    indexCtrl.$inject = ['$scope', 'indexSrv'];

    angular.module('rrms')
        .controller('indexCtrl', indexCtrl);

})();
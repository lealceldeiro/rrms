/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var navigationSrv = function ($location, $route, ROUTE, $window) {
    var vm = this;


    vm.service = {
        DEFAULT_PATH: ROUTE.MAIN,
        LOGIN_PATH: ROUTE.LOGIN,

        goTo: fnGoTo,
        back: fnBack,

        currentPath: fnCurrentPath,
        currentParams: fnCurrentParams
    };

    return vm.service;

    function fnGoTo(link) {
        if (link){
            if ($location.path() === link){
                $route.reload();
            }else{
                $location.path(link);
            }
        }
    }


    function fnCurrentPath() {
        return $location.path();
    }

    function fnCurrentParams() {
        return $route.current.params;
    }

    function fnBack() {
        $window.history.back();
    }

};

navigationSrv.$inject = ['$location', '$route', 'ROUTE', '$window'];

angular.module('rrms')
    .service('navigationSrv', navigationSrv);
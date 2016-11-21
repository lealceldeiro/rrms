/**
 * Created by Asiel on 11/7/2016.
 */

'use strict';

(function() {

    var runConfig = function ($rootScope, sessionSrv, navigationSrv) {

        var prevRoute;

        $rootScope.$on('$routeChangeStart', function (a, b) {
            if (b && b.$$route && b.$$route.originalPath) {
                var route = b.$$route.originalPath;

                /******************************VISUAL ELEMENTS HANDLING************************************************/
                //add and remove class to active links (nav bars,menus...)
                var s, p;
                if (prevRoute) {
                    s = prevRoute.substring(1, prevRoute.length);
                    p = s.indexOf('/'); //path
                    if (p > 0) {
                        s = s.substring(0, p);  //take only the first part of the path, i.e.: from "role/3/show/", just take "role"
                    }
                    angular.element(document.querySelectorAll('.' + s)).removeClass('active');  //remove class from all of the previous route
                }
                s = route.substring(1, route.length);
                p = s.indexOf('/');
                if (p > 0) {
                    s = s.substring(0, p);
                }
                angular.element(document.querySelectorAll('.' + s)).addClass('active');        //add class from to of the new route
                prevRoute = route;

                /****************************AUTHENTICATION CHECK******************************************************/
                //routes excluded from login check
                if (route !== '/login' && route !== '/configuration-error') {
                    //not using "ROUTE.LOGIN" AND 'ROUTE.CONFIG_ERROR" because they might not be defined at this point
                    if (!sessionSrv.isLogged()) {
                        navigationSrv.goTo(navigationSrv.LOGIN_PATH);
                    }
                }
                //in case user is already logged, redirect to default path
                else if (route === '/login'){
                    prevRoute = null;
                    if (sessionSrv.isLogged()) {
                        navigationSrv.goTo(navigationSrv.DEFAULT_PATH);
                    }
                }
            }
        });

    };

    runConfig.$inject = ['$rootScope', 'sessionSrv', 'navigationSrv'];

    angular.module('rrms')
        .run(['$rootScope', 'sessionSrv', 'navigationSrv', runConfig]);

})();
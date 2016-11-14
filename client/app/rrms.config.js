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

                //add and remove class to active links (nav bars,menus...)
                var s, p;
                if (prevRoute) {
                    s = prevRoute.substring(1, prevRoute.length);
                    p = s.indexOf('/');
                    if (p > 0) {
                        s = s.substring(0, p);
                    }
                    angular.element(document.querySelectorAll('.' + s)).removeClass('active');
                }
                s = route.substring(1, route.length);
                p = s.indexOf('/');
                if (p > 0) {
                    s = s.substring(0, p);
                }
                angular.element(document.querySelectorAll('.' + s)).addClass('active');
                prevRoute = route;

                if (route !== '/login') {
                    if (!sessionSrv.isLogged()) {
                        navigationSrv.goTo(navigationSrv.LOGIN_PATH);
                    }
                }
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
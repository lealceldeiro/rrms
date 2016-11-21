/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

(function() {

    var env = {};

    // Import variables if present (from env.js)
    if(window){
        Object.assign(env, window.__env);
        if (window.__env) {
            env.found = true;
        }
    }

    var config = function ($logProvider, __env) {
        $logProvider.debugEnabled(__env.enableDebug);
    };

    var run = function () {

    };

    config.$inject = ['$logProvider', '__env'];
    run.$inject = [];

    angular.module
    ('rrms',
        [
            'ngRoute',                                          //routing
            'angularUtils.directives.dirPagination'             //pagination
        ]
    )
        .constant('__env', env)         // Register environment in AngularJS as constant
        .config(config)
        .run(run);


})();
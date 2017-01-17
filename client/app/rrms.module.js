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

    var config = function ($logProvider) {
        $logProvider.debugEnabled(true);
    };

    var run = function () {

    };

    config.$inject = ['$logProvider'];
    run.$inject = [];

    angular.module
    ('rrms',
        [
            'ngRoute',                                          //routing
            'ngSanitize',                                       //ngSanitize module (for ui-select)
            'ui.select',                                        //ui-select component for select options
            'angularUtils.directives.dirPagination',            //pagination
            'LocalStorageModule'                                //local storage module, used for instance for storing auth token
        ]
    )
        .constant('__env', env)         // Register environment in AngularJS as constant
        .config(config)
        .run(run);


})();
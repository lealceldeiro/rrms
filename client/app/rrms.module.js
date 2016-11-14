/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

(function() {

    var config = function () {

    };
    var run = function () {

    };

    config.$inject = [];
    run.$inject = [];

    angular.module
    ('rrms',
        [
            'ngRoute',
            'angularUtils.directives.dirPagination'
        ]
    )
        .config(config)
        .run(run);


})();
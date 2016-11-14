/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

(function() {

    angular.module('rrms')
        .constant(
            'ROUTE', {
                LOGIN: '/login',
                MAIN: '/main',

                ROLES: '/roles',
                ROLE_EDIT: '/roles/:id/edit',
                ROLE_NEW: '/roles/new',
                ROLE_VIEW: '/roles/:id/view',

                USERS: '/usuarios',

                HOUSES: '/casas',

                LOCATIONS: '/ubicaciones',

                RESERVATIONS: '/reservaciones',

                ACTIONS_BY_ROLES: '/acciones-por-roles'
            }
        )
})();
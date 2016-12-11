/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

(function() {

    angular.module('rrms')
        .constant(
            'ROUTE', {
                CONFIG_ERROR: '/configuration-error',
                LOGIN: '/login',
                MAIN: '/main',

                ROLES: '/roles',
                ROLE_EDIT: '/roles/:id/edit', ROLE_EDIT_PL: ':id',
                ROLE_NEW: '/roles/new',
                ROLE_VIEW: '/roles/:id/view', ROLE_VIEW_PL: ':id',

                USERS: '/usuarios',

                HOUSES: '/casas',

                LOCATIONS: '/ubicaciones',

                RESERVATIONS: '/reservaciones',

                ACTIONS_BY_ROLES: '/acciones-por-roles'
            }
        )
})();
/**
 * Created by Asiel on 11/17/2016.
 */
(
    function () {
        'use strict';

        var systemSrv = function (__env) {
            var self = this;

            self.service = {
                urlBase:
                    (__env.baseUrl !== '<your_app_base_url>')? __env.baseUrl || '/' : '/',
                //api
                APIUrl:
                    (__env.api.Url !== '<your_api_base_url>')? __env.api.Url || '' : '',
                successFlag:
                    (__env.api.successFlag !== '<your_api_success_flag>')? __env.api.successFlag || 'success' : 'success',
                errorMessageFlag:
                    (__env.api.errorMessageFlag !== '<your_api_error_message_flag>')? __env.api.errorMessageFlag || 'errorMessage' : 'errorMessage',
                successMessageFlag:
                    (__env.api.successMessageFlag !== '<your_api_success_message_flag>')? __env.api.successMessageFlag || 'successMessage' : 'successMessage',
                totalCountFlag:
                    (__env.api.totalCountFlag !== '<your_api_total_count_flag>')? __env.api.totalCountFlag || 'total' : 'total',
                itemsFlag:
                    (__env.api.itemsFlag !== '<your_api_items_flag>')? __env.api.itemsFlag || 'items' : 'items',

                apiMessage: null,
                apiTotalCount: null,
                apiItems: null,

                eval: fnEvaluateResponseData
            };

            return self.service;

            /**
             * Evaluates a data from a server response and indicates whether the server said the operations was successful
             * or not. By successful or not it is excluded server errors, denies, etc (500, 401, 403, and so on). By
             * successful or not it is said if, for instance, there was not business rules violated and the operations
             * finished properly.
             * @param data data to be evaluated
             * @returns {boolean} true if success, false otherwise
             */
            function fnEvaluateResponseData(data) {
                if (data) {
                    if (data[self.service.successFlag]) {
                        self.service.apiMessage = data[self.service.successMessageFlag];
                        self.service.apiTotalCount = data[self.service.totalCountFlag];
                        self.service.apiItems = data[self.service.itemsFlag];
                        return true
                    }
                    else {
                        self.service.apiMessage = data[self.service.errorMessageFlag];
                        return false
                    }
                }
                self.service.apiMessage = 'There was not data provided';
                return false
            }

        };

        systemSrv.$inject = ['__env'];

        angular.module('rrms')
            .service('systemSrv', systemSrv);
    }
)();
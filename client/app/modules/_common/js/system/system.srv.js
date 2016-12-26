/**
 * Created by Asiel on 11/17/2016.
 */
(
    function () {
        'use strict';

        var systemSrv = function (__env, notificationSrv) {
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
                itemFlag:
                    (__env.api.itemFlag !== '<your_api_item_flag>')? __env.api.itemFlag || 'item' : 'item',

                apiMessage: null,
                apiTotalCount: null,
                apiItems: null,
                apiItem: null,

                eval: fnEvaluateResponseData
            };

            return self.service;

            /**
             * Evaluates a data from a server response and indicates whether the server said the operations was successful
             * or not. By successful or not it is excluded server errors, denies, etc (500, 401, 403, and so on). By
             * successful or not it is said if, for instance, there was not business rules violated and the operations
             * finished properly.
             * @param data data to be evaluated
             * @param notifyOnSuccess Whether a notification should be shown or not on success result
             * @param notifiyOnUnSuccess Whether a notification should be shown or not on non-success result
             * @param callback A callback to be shown in the notification as an action to be taken by the user
             * @returns {boolean} true if success, false otherwise
             */
            function fnEvaluateResponseData(data, notifyOnSuccess, notifiyOnUnSuccess, callback) {
                if (data) {
                    if (data[self.service.successFlag]) {
                        self.service.apiMessage = data[self.service.successMessageFlag] || notificationSrv.utilText.successfulOperation.es;
                        self.service.apiTotalCount = data[self.service.totalCountFlag];
                        self.service.apiItems = data[self.service.itemsFlag];
                        self.service.apiItem = data[self.service.itemFlag];
                        if (notifyOnSuccess) {
                            notificationSrv.showNotif(self.service.apiMessage, notificationSrv.utilText.titleSuccess.es,
                                notificationSrv.type.SUCCESS);
                        }

                        return true
                    }
                    else {
                        self.service.apiMessage = data[self.service.errorMessageFlag] || notificationSrv.utilText.unSuccessfulOperation.es;

                        if (notifiyOnUnSuccess) {
                            notificationSrv.showNotif(self.service.apiMessage, notificationSrv.utilText.titleError.es,
                                notificationSrv.type.ERROR);
                        }

                        return false
                    }
                }
                self.service.apiMessage = 'There was not data provided';
                return false
            }

        };

        systemSrv.$inject = ['__env', 'notificationSrv'];

        angular.module('rrms')
            .service('systemSrv', systemSrv);
    }
)();
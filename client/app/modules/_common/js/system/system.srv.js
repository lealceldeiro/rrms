/**
 * Created by Asiel on 11/17/2016.
 */
(
    function () {
        'use strict';

        var systemSrv = function (__env, notificationSrv) {
            var self = this;

            self.service = {
                //api
                APIUrl:
                    (__env.api.Url !== '<your_api_base_url>')? __env.api.Url || 'http://127.0.0.1/api' : 'http://127.0.0.1/api',
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

                //auth
                headerAuthTokenFlag:
                    (__env.api.headerAuthTokenFlag !== '<your_api_header_token_flag>')? __env.api.headerAuthTokenFlag
                        || 'Authorization' : 'Authorization',
                headerUnAuthTokenFlag:
                    (__env.api.headerUnAuthTokenFlag !== '<your_api_header_unAuth_flag>')? __env.api.headerUnAuthTokenFlag
                        || 'X-Auth-Token' : 'X-Auth-Token',
                headerAuthBearerFlag:
                    (__env.api.headerAuthBearerFlag !== '<your_api_header_auth_bearer_flag>')? __env.api.headerAuthBearerFlag
                        || 'Bearer ' : 'Bearer ', //important the space at the end of the text
                itemTokenFlag:
                    (__env.api.itemTokenFlag !== '<your_api_item_token_flag>')? __env.api.itemTokenFlag
                        || 'access_token' : 'access_token',
                itemRefreshTokenFlag:
                    (__env.api.itemRefreshTokenFlag !== '<your_api_item_refresh_token_flag>')? __env.api.itemRefreshTokenFlag
                        || 'refresh_token' : 'refresh_token',
                userAuthFlag:
                    (__env.api.userAuthFlag !== '<your_api_user_login_flag>')? __env.api.userAuthFlag
                        || 'usrnm' : 'usrnm',
                passwordAuthFlag:
                    (__env.api.passwordAuthFlag !== '<your_api_password_login_flag>')? __env.api.passwordAuthFlag
                        || 'pswrd' : 'pswrd',
                userAuthResponseFlag:
                    (__env.api.userAuthResponseFlag !== '<your_user_auth_response_flag>')? __env.api.userAuthResponseFlag
                        || 'username' : 'username',
                unauthorizedResponseCodeFlag:
                    (__env.api.unauthorizedResponseCodeFlag !== '<your_user_auth_response_flag>')? __env.api.unauthorizedResponseCodeFlag
                        || 401 : 401,

                // accessible from outside, but not recommended to do so, internal service usage
                apiMessage: {},
                apiTotalCount: {},
                apiItems: {},
                apiItem: {},
                userAuthResponse: {},
                itemToken: {},
                itemRefreshToken: {},


                eval: fnEvaluateResponseData,
                evalAuth: fnEvaluateAuthenticationData,

                getMessage: fnGetMessage,
                getTotal: fnGetTotalCount,
                getItems: fnGetItems,
                getItem: fnGetItem,
                getAuthToken: fnGetAuthToken,
                getAuthRefreshToken: fnGetAuthRefreshToken,
                getAuthUser: fnGetAuthUser
            };

            return self.service;

            /**
             * Evaluates a data from a server response and indicates whether the server said the operation was successful
             * or not. By successful or not it is excluded server errors, denies, etc (500, 401, 403, and so on). By
             * successful or not it is said if, for instance, there was not business rules violated and the operations
             * finished properly.
             * @param data data to be evaluated
             * @param storeKey key under which the data will be store
             * @param notifyOnSuccess Whether a notification should be shown or not on success result
             * @param notifyOnUnSuccess Whether a notification should be shown or not on non-success result
             * @param callback A callback to be shown in the notification as an action to be taken by the user
             * @returns {boolean} true if success, false otherwise
             */
            function fnEvaluateResponseData(data, storeKey, notifyOnSuccess, notifyOnUnSuccess, callback) {
                validate(storeKey);
                if (data) {
                    if (data[self.service.successFlag]) {
                        self.service.apiMessage[storeKey] = data[self.service.successMessageFlag] || notificationSrv.utilText.successfulOperation.es;
                        self.service.apiTotalCount[storeKey] = data[self.service.totalCountFlag];
                        self.service.apiItems[storeKey] = data[self.service.itemsFlag];
                        self.service.apiItem[storeKey] = data[self.service.itemFlag];
                        if (notifyOnSuccess) {
                            notificationSrv.showNotif(self.service.apiMessage[storeKey], notificationSrv.utilText.titleSuccess.es,
                                notificationSrv.type.SUCCESS);
                        }

                        return true
                    }
                    else {
                        self.service.apiMessage[storeKey] = data[self.service.errorMessageFlag] || notificationSrv.utilText.unSuccessfulOperation.es;

                        if (notifyOnUnSuccess) {
                            notificationSrv.showNotif(self.service.apiMessage[storeKey], notificationSrv.utilText.titleError.es,
                                notificationSrv.type.ERROR);
                        }

                        return false
                    }
                }
                self.service.apiMessage[storeKey] = 'There was not data provided for request with key "' + storeKey + '"';
                if (notifyOnUnSuccess) {
                    notificationSrv.showNotif(self.service.apiMessage[storeKey], notificationSrv.utilText.titleError.es,
                        notificationSrv.type.ERROR);
                }
                return false
            }

            /**
             * Evaluates a data from a server response on "login action" and indicates whether the server said the
             * operation was successful or not. By successful or not it is excluded server errors, denies,
             * etc (500, 401, 403, and so on). By
             * successful or not it is said if, for instance, there was not business rules violated and the operations
             * finished properly.
             * @param data data to be evaluated
             * @param notifyOnSuccess Whether a notification should be shown or not on success result
             * @param notifyOnUnSuccess Whether a notification should be shown or not on non-success result
             * @param callback A callback to be shown in the notification as an action to be taken by the user
             * @returns {boolean} true if success, false otherwise
             */
            function fnEvaluateAuthenticationData(data, notifyOnSuccess, notifyOnUnSuccess, callback) {
                if (data) {
                    if (data[self.service.itemTokenFlag]) {
                        self.service.userAuthResponse = data[self.service.userAuthResponseFlag];
                        self.service.itemToken = data[self.service.itemTokenFlag];
                        self.service.itemRefreshToken = data[self.service.itemRefreshTokenFlag];
                        if (notifyOnSuccess) {
                            //todo
                        }

                        return true
                    }
                    else {
                        if (notifyOnUnSuccess) {
                            //todo
                        }

                        return false
                    }
                }
                if (notifyOnUnSuccess) {
                    //todo
                }
                return false
            }

            function fnGetMessage(key) {
                validate(key);
                return self.service.apiMessage[key]
            }

            function fnGetTotalCount(key) {
                validate(key);
                return self.service.apiTotalCount[key]
            }

            function fnGetItems(key) {
                validate(key);
                return self.service.apiItems[key]
            }

            function fnGetItem(key) {
                validate(key);
                return self.service.apiItem[key]
            }


            function fnGetAuthUser() {
                return self.service.userAuthResponse
            }

            function fnGetAuthToken() {
                return self.service.itemToken
            }

            function fnGetAuthRefreshToken() {
                return self.service.itemRefreshToken
            }


            function validate(key) {
                if (typeof key === 'undefined' || key === null) {
                    throw Error('A Key must be provided in order to store the server response')
                }
            }

        };

        systemSrv.$inject = ['__env', 'notificationSrv'];

        angular.module('rrms')
            .service('systemSrv', systemSrv);
    }
)();
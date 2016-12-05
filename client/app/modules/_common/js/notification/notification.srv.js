/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var notificationSrv = function ($timeout) {
    var self = this;

    var timmer;
    var callBack = null;
    const c = {
        'success': 'alert-success',
        'info': 'alert-info',
        'warning': 'alert-warning',
        'danger': 'alert-danger'
    };

    self.service = {
        htmlContent: null,
        type: {
            INFO: 'Información: ',
            CONF: 'Confirmación: ',
            ERROR: 'Error: ',
            SUCCESS: 'Éxito: ',
            WARNING: 'Advertencia: '
        },

        utilText: {
            "titleError": {
                en: "Error",
                es: "Error"
            },
            "titleSccess": {
                en: "Success: ",
                es: "Éxito"
            }
        },

        showNotif: fnShow,
        executeCallBack: fnExecuteCallBack
    };

    return self.service;

    /**
     * Shows a notification
     * @param message Notification message
     * @param title (optional) Title for this notification
     * @param type (optional) Notification type. It must be one of the following: notificationSrv.type.INFO, notificationSrv.type.CONF,
     * notificationSrv.type.ERROR, notificationSrv.type.SUCCESS or notificationSrv.type.WARNING. If not type is provided,
     * notificationSrv.type.INFO will be used
     * @param action (optional) Function to be executed as action presented by a Text
     * @param actionName (optional) Text which names the action to be executed by the function passes as parameter
     */
    function fnShow(message, title, type, action, actionName) {

        if (typeof message === 'undefined' || message === null) {
            throw new Error('A message must be provided for showing a notification');
        }

        // angular.element( document.querySelector('#notifBadge') ).alert('close'); //close previous

        //div
        const notif = angular.element('<div class="notification alert alert-dismissible fade in" role="alert" id="notifBadge">');
        //close button
        notif.append(
            angular.element(
                '<button type="button" class="close" data-dismiss="alert">' +
                '   <span aria-hidden="true" data-ng-click="nc.clear()">&times;</span>' +
                '   <span class="sr-only">Cerrar</span>' +
                '</button>'
            )
        );

        //class (type of alert)
        var dClass = '';
        switch (type) {
            case self.service.type.INFO:
                dClass = c.info;
                break;
            case self.service.type.CONF:
                dClass = c.warning;
                break;
            case self.service.type.ERROR:
                dClass = c.danger;
                break;
            case self.service.type.SUCCESS:
                dClass = c.success;
                break;
            case self.service.type.WARNING:
                dClass = c.warning;
                break;
            default:
                dClass = c.info;
        }

        //todo: add support for showing a smaller notific, mainly intended for mobile devices

        //title
        var text = title  ? (title  + ': ') : type;
        var t = angular.element('<strong>' + text + '</strong><span>' +  message + '</span>');

        notif.addClass(dClass);
        notif.append(t);
        //if call back for taking any action
        if (action) {
            callBack = action;
            notif.append('&nbsp;&nbsp;');
            const undo = angular.element('<u><strong class=""><a class="hand-pointer text-muted" data-ng-click="nc.executeCallBack()">' + actionName + '</a></strong></u>');
            notif.append(undo);
        }

        const wrapper = angular.element('<div>').append(notif);
        self.service.htmlContent = wrapper.html();

        if (timmer) {
            $timeout.cancel(timmer);
        }
        timmer = $timeout(
            function () {
                self.service.htmlContent = null;
                angular.element( document.querySelector('#notifBadge') ).alert('close');
            },
            5000
        )

    }

    function fnExecuteCallBack() {
        if (callBack && angular.isFunction(callBack)) {
            callBack();
            angular.element( document.querySelector('#notifBadge') ).alert('close');
        }
    }
};

notificationSrv.$inject = ['$timeout'];

angular.module('rrms')
    .service('notificationSrv', notificationSrv);
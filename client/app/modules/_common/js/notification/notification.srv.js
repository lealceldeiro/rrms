/**
 * Created by Asiel on 11/6/2016.
 */

'use strict';

var notificationSrv = function ($timeout) {
    var vm = this;

    var timmer;
    var callBack = null;
    const c = {
        'success': 'alert-success',
        'info': 'alert-info',
        'warning': 'alert-warning',
        'danger': 'alert-danger'
    };

    vm.service = {
        htmlContent: null,
        type: {
            INFO: 'Información: ',
            CONF: 'Confirmación: ',
            ERROR: 'Error: ',
            SUCCESS: 'Éxito: ',
            WARNING: 'Advertencia: '
        },

        show: fnShow,
        executeCallBack: fnExecuteCallBack
    };

    return vm.service;

    function fnShow(type, title, message, callbackUndo, callbackName) {

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
            case vm.service.type.INFO:
                dClass = c.info;
                break;
            case vm.service.type.CONF:
                dClass = c.warning;
                break;
            case vm.service.type.ERROR:
                dClass = c.danger;
                break;
            case vm.service.type.SUCCESS:
                dClass = c.success;
                break;
            case vm.service.type.WARNING:
                dClass = c.warning;
                break;
        }

        //todo: add support for showing a smaller notific, mainly intended for mobile devices

        //title
        var text = title  ? (title  + ': ') : type;
        var t = angular.element('<strong>' + text + '</strong><span>' +  message + '</span>');

        notif.addClass(dClass);
        notif.append(t);
        //if call back for taking any action
        if (callbackUndo) {
            callBack = callbackUndo;
            notif.append('&nbsp;&nbsp;');
            const undo = angular.element('<u><strong class=""><a class="hand-pointer text-muted" data-ng-click="nc.executeCallBack()">' + callbackName + '</a></strong></u>');
            notif.append(undo);
        }

        const wrapper = angular.element('<div>').append(notif);
        vm.service.htmlContent = wrapper.html();

        if (timmer) {
            $timeout.cancel(timmer);
        }
        timmer = $timeout(
            function () {
                vm.service.htmlContent = null;
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
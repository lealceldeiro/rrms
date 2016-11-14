/**
 * Created by Asiel on 11/7/2016.
 */

var App = function () {

    var uiInit = function () {

    };

    return {
        init: function () {
            uiInit();
        }
    };

}();

/*Inicia la aplicación cuando la página carga*/
$(document).ready(App.init);
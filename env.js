/**
 * Created by Asiel on 11/18/2016.
 */

/**
 * - It is required to have this configuration file along with the project in order to get the system working properly, since
 * it contains all needed configurations for accessing the api resources. *
 */

(function(window){

    window.__env = window && window.__env ? window.__env : {};
    $.getJSON("/vars.json", function(json) {
        assign(json);
    });

    function assign(o) {
        window.__env.api={

            BaseUrl: o.BaseUrl,

            ApiRelativeUrl: o.ApiRelativeUrl,

            successFlag: o.successFlag,

            errorMessageFlag: o.errorMessageFlag,

            successMessageFlag: o.successMessageFlag,

            totalCountFlag: o.totalCountFlag,

            itemsFlag: o.itemsFlag,

            itemFlag:o.itemFlag,

            headerAuthTokenFlag: o.headerAuthTokenFlag,

            headerUnAuthTokenFlag: o.headerUnAuthTokenFlag,

            headerAuthBearerFlag: o.headerAuthBearerFlag,

            itemTokenFlag: o.itemTokenFlag,

            itemRefreshTokenFlag: o.itemRefreshTokenFlag,

            newTokenRequesterFlag: o.newTokenRequesterFlag,

            userAuthFlag: o.userAuthFlag,

            passwordAuthFlag: o.passwordAuthFlag,

            userAuthResponseFlag: o.userAuthResponseFlag,

            authPermissionsFlag: o.authPermissionsFlag,

            unauthorizedResponseCodeFlag: o.unauthorizedResponseCodeFlag

        };
    }

})(this);

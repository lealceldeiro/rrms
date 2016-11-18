/**
 * Created by Asiel on 11/18/2016.
 */

(
    function (window) {
    window.__env = window && window.__env ? window.__env : {};

    // API url
    window.__env.apiUrl = '<your_absoute_api_restURL_here>';

    // Base url
    window.__env.baseUrl = '<your_absoute_baseUrl_here>';

    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;
}
)(this);
/**
 * Created by Asiel on 11/18/2016.
 */

(
    function (window) {

        /**
         * Configuration options
         **/

        window.__env = window && window.__env ? window.__env : {};

        // API
        window.__env.api = {
            Url:                    'http://localhost:8085/rrmsrest/', // url for requesting services
            successFlag:            'success',                         // variable for indicating a successful operation
            errorMessageFlag:       'errorMessage',                    // variable for indicating an error message
            successMessageFlag:     'successMessage',                  // variable for indicating a success message
            totalCountFlag:         'total',                           // variable for indicating a total count of elements
            itemsFlag:              'items'                            // variable for indicating a list of items
        };

        // Base url
        window.__env.baseUrl = '/';

        // Whether or not to enable debug mode
        // Setting this to false will disable console output
        window.__env.enableDebug = true;


    }
)(this);
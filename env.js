/**
 * Created by Asiel on 11/18/2016.
 */

/**
 * Despite this configuration file contains only optional attributes to be set. It is required to keep it along
 * with the project for keeping consistency, due to the fact that in the future any new [required] property can be added
 * and because by keeping this file it makes easier to configure the system for different environments.
 *
 * If none of the property is going to be modified according to the API characteristic, fell free to delete them,
 * comment them or just leave with the placeholders.
 */

(
    function (window) {

        /**
         * Configuration options
         **/

        window.__env = window && window.__env ? window.__env : {};

        // API
        window.__env.api = {
            Url:                    'http://localhost:8085/rrmsrest/', // [optional] - url for requesting services
                                                                       // [default]  - ""

            successFlag:            'success',                         // [optional] - Variable in which your api response will indicate a successful operation
                                                                       // [default]  - "success"

            errorMessageFlag:       'errorMessage',                    // [optional] - Variable  in which your api response will indicate an error message
                                                                       // [default]  - "errorMessage"

            successMessageFlag:     'successMessage',                  // [optional] - Variable  in which your api response will indicate a success message
                                                                       // [default]  - "successMessage"

            totalCountFlag:         'total',                           // [optional] - Variable  in which your api response will indicate a total count of elements
                                                                       // [default]  - "total"

            itemsFlag:              'items'                            // [optional] - Variable  in which your api response will indicate a list of items
                                                                       // [default]  - "items"
        };

        // Base url
        window.__env.baseUrl =      '/';                                // [optional] - Variable for indicating the base url of the application
                                                                        // [default]  - "/"

        window.__env.enableDebug = true;                                // [optional] -  Whether or not to enable debug mode
                                                                        // [default]  - true


    }
)(this);
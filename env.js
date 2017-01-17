/**
 * Created by Asiel on 11/18/2016.
 */

/**
 * - It is required to have this configuration file along with the project in order to get the system working properly, since
 * it contains all needed configurations for accessing the api resources.
 *
 * - If none of the property is going to be modified according to the API characteristic, fell free to delete them,
 * comment them or just leave them with the placeholders.
 *
 * - IMPORTANT: do not modify the content inside sections enclosed with comment indicating that modification should not be done !!!
 */


            /** Code LINE 1: Do not modify the line below */
(function(window){window.__env=window&&window.__env?window.__env:{};window.__env.api={
            /** END - Code LINE 1: Do not modify the above line*/





            /**
             * ********************************************************|||||***********************************************
             *                                             Configuration options HERE!!!
             * ********************************************************|||||***********************************************
             **/



            Url:                     '<your_api_base_url>',               // [optional] - url for requesting services
                                                                          // [default]  - "/api/"

            successFlag:             '<your_api_success_flag>',           // [optional] - Variable in which your api response will indicate a successful operation
                                                                          // [default]  - "success"

            errorMessageFlag:        '<your_api_error_message_flag>',     // [optional] - Variable in which your api response will indicate an error message
                                                                          // [default]  - "errorMessage"

            successMessageFlag:      '<your_api_success_message_flag>',   // [optional] - Variable in which your api response will indicate a success message
                                                                          // [default]  - "successMessage"

            totalCountFlag:          '<your_api_total_count_flag>',       // [optional] - Variable in which your api response will indicate a total count of elements
                                                                          // [default]  - "total"

            itemsFlag:               '<your_api_items_flag>',             // [optional] - Variable in which your api response will indicate a list of items
                                                                          // [default]  - "items"

            itemFlag:                '<your_api_item_flag>',              // [optional] - Variable in which your api response will indicate the item
                                                                          // [default]  - "item"

            //related to authentication

            headerAuthTokenFlag:     '<your_api_header_token_flag>',      // [optional] - Variable for sending the auth token in the request header
                                                                          // [default]  - "Authorization"
            headerStartAuthTokenFlag:'<your_api_header_start_token_flag>',// [optional] - Variable which represents the string at the beginning of the auth token
                                                                          // [default]  - "Bearer " - Note the space at the end of the text

            userAuthFlag:            '<your_api_user_login_flag>',        // [optional] - Variable for sending the auth username in the request header and sending the request when do login
                                                                          // [default]  - "usrnm"

            passwordAuthFlag:        '<your_api_password_login_flag>'     // [optional] - Variable for sending the auth password in the request header and sending the request when do login
                                                                          // [default]  - "pswrd"


            /**
             * ********************************************************|||||***********************************************
             * ********************************************************|||||***********************************************
             **/





        /** Code LINE 2: Do not modify the line below */
};})(this);
        /** END - Code LINE 2:  Do not modify the above line*/

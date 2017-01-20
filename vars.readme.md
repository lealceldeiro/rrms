On this root directory there must be two files (*env.js* and *vars.json*)
If any of them is not present the app won't run.

In order to configure the app for fitting the api provider specifications
You can modify the next var on *vars.json*:


            BaseUrl:                        '<your_api_base_url>',                  // - server base url for requesting services
                                                                                    // [default]  - "http://127.0.0.1"

            ApiRelativeUrl:                 '<your_api_relative_url>',              // - relative url for requesting services via api
                                                                                    // [default]  - "/api/"

            successFlag:                    '<your_api_success_flag>',              // - Variable in which your api response will indicate a successful operation
                                                                                    // [default]  - "success"

            errorMessageFlag:               '<your_api_error_message_flag>',        // - Variable in which your api response will indicate an error message
                                                                                    // [default]  - "errorMessage"

            successMessageFlag:             '<your_api_success_message_flag>',      // - Variable in which your api response will indicate a success message
                                                                                    // [default]  - "successMessage"

            totalCountFlag:                 '<your_api_total_count_flag>',          // - Variable in which your api response will indicate a total count of elements
                                                                                    // [default]  - "total"

            itemsFlag:                      '<your_api_items_flag>',                // - Variable in which your api response will indicate a list of items
                                                                                    // [default]  - "items"

            itemFlag:                       '<your_api_item_flag>',                 // - Variable in which your api response will indicate the item
                                                                                    // [default]  - "item"

            //related to authentication

            headerAuthTokenFlag:            '<your_api_header_token_flag>',         // - Variable for sending the auth token in the request header
                                                                                    // [default]  - "Authorization"

            headerUnAuthTokenFlag:          '<your_api_header_unAuth_flag>',        // - Variable for sending the auth token in the request header for loggin out
                                                                                    // [default]  - "X-Auth-Token"

            headerAuthBearerFlag:           '<your_api_header_auth_bearer_flag>',   // - Variable which represents the string at the beginning of the auth token (bearer type of the token)
                                                                                    // [default]  - "Bearer " - Note the space at the end of the text

            itemTokenFlag:                  '<your_api_item_token_flag>',           // - Variable in which your api response will indicate the access token
                                                                                    // [default]  - "access_token"

            itemRefreshTokenFlag:           '<your_api_item_refresh_token_flag>',   // - Variable in which your api response will indicate the access refresh token
                                                                                    // [default]  - "refresh_token"

            newTokenRequesterFlag:          '<your_api_new_token_requester_flag>',  // - Variable in which you will indicate the name of the var for indicating the type for requesting a new token
                                                                                    // [default]  - "grant_type"

            userAuthFlag:                   '<your_api_user_login_flag>',           // - Variable for sending the auth username in the request header and sending the request when do login
                                                                                    // [default]  - "usrnm"

            passwordAuthFlag:               '<your_api_password_login_flag>',       // - Variable for sending the auth password in the request header and sending the request when do login
                                                                                    // [default]  - "pswrd"

            userAuthResponseFlag:           '<your_user_auth_response_flag>',       // - Variable for sending the auth password in the request header and sending the request when do login
                                                                                    // [default]  - "username"

            authPermissionsFlag:            '<your_auth_permissions_flag>',         // - Variable for sending the auth password in the request header and sending the request when do login
                                                                                    // [default]  - "permissions"

            unauthorizedResponseCodeFlag:   '<your_user_auth_response_flag>'        // - Response code sent by server when request is unauthorized
                                                                                    // [default]  - "401"

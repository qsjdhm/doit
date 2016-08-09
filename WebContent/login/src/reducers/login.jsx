/* Combine all available reducers to a single root reducer.
 *
 * CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */

import { combineReducers } from "redux";
import { cr } from "../utils/index";
import { CHANGE_USERNAME, CHANGE_PASSWORD } from "../actions/login";

export default combineReducers ( {
    username : cr( '', {
        [CHANGE_USERNAME]( state, { value } ){ return value; }
    } ),
    password : cr( '', {
        [CHANGE_PASSWORD]( state, { value } ){ return value; }
    } ),
} );



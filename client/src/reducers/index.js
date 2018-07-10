// IMPORT AUTHREDUCER AND COMBINEREDUCERS CALL
import { combineReducers } from "redux";
// IMPORT REDUCER THAT IS CREATED BY REDUX-FORM
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";

// PLACE COMBINEREDUCERS CALL AND EXPORT
export default combineReducers({
	// object we pass in represent the keys in state object
	// AUTH STATE IS BEING PRODUCED BY AUTHREDUCER
	auth: authReducer,
	form: reduxForm
});

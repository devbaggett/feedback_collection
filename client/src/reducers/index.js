// IMPORT AUTHREDUCER AND COMBINEREDUCERS CALL
import { combineReducers } from "redux";
import authReducer from "./authReducer";

// PLACE COMBINEREDUCERS CALL AND EXPORT
export default combineReducers({
	// object we pass in represent the keys in state object
	// AUTH STATE IS BEING PRODUCED BY AUTHREDUCER
	auth: authReducer
});

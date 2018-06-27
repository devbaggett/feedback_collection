// CREATE REDUCER

// IMPORT FETCH USER ACTION TYPE
import { FETCH_USER } from "../actions/types";

// EXPORT FUNCTION WITH 2 ARG/OBJECTS
// create state as empty object at first
export default function(state = null, action) {
	// log every action that this reducer gets called with
	// console.log(action);
	// switch over action type (right now just default)
	switch (action.type) {
		// ADD CASE STATEMENT FOR FETCH_USER ACTION
		case FETCH_USER:
			// return user model or empty string (false)
			return action.payload || false;
		default:
			return state;
	}
}

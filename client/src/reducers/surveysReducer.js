// IMPORT FETCH_SURVEYS TYPE
import { FETCH_SURVEYS } from "../actions/types";

// CREATE AND EXPORT REDUCER
// by default, reducer will return empty array on startup
export default function(state = [], action) {
	switch (action.type) {
		// when action.type is equal to FETCH_SURVEYS
		case FETCH_SURVEYS:
			return action.payload;
		default:
			return state;
	}
}

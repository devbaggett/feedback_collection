// CREATE REDUCER

// EXPORT FUNCTION WITH 2 ARG/OBJECTS
// create state as empty object at first
export default function(state = {}, action) {
	// log every action that this reducer gets called with
	console.log(action);
	// switch over action type (right now just default)
	switch (action.type) {
		default:
			return state;
	}
}

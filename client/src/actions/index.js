// IMPORT AXIOS LIBRARY
import axios from "axios";

// IMPORT FETCH_USER
import { FETCH_USER } from "./types";

// DEFINE ACTION CREATOR
export const fetchUser = () => async dispatch => {
	// MAKE GET REQUEST TO BACKEND (found in authRoutes.js)
	const res = await axios.get("/api/current_user");
	dispatch({ type: FETCH_USER, payload: res });
};

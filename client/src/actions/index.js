// IMPORT AXIOS LIBRARY
import axios from "axios";

// IMPORT FETCH_USER
import { FETCH_USER } from "./types";

// DEFINE ACTION CREATOR
const fetchUser = () => {
	// MAKE GET REQUEST TO BACKEND (found in authRoutes.js)
	axios.get("/api/current_user");
};

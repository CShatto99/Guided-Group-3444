import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAlert, clearAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import { loadProfile, clearProfile } from "./profile";

//Interface for LoginData object
interface LoginData {
  email: string;
  password: string;
}

//Interface for RegisterData object
interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

//Interface for UserState object
export interface UserState {
  isAuth: boolean;
  user: {
    fullName: string;
    email: string;
  };
  loading: boolean;
}

/* Function:    createlice
 * Parameters:  An object containing the name, initial state, and reducers object of the user slice.
 * Return:      Slice object.
 * Purpose:     This function is used to generate action creators and action types for
 *              the user reducer and state given a name, initial state, and reducers
 *              object. This function will inject all user data received from the API
 *              into the React application state.
 */
const user = createSlice({
  name: "user",
  initialState: {
    isAuth: false,
    user: {},
    loading: true,
  } as UserState,
  reducers: {
    login_user(state, action: PayloadAction<UserState["user"]>) {
      localStorage.setItem("isAuth", "true");
      state.isAuth = true;
      state.user = action.payload;
      state.loading = false;
    },
    logout_user(state) {
      localStorage.removeItem("isAuth");
      state.isAuth = false;
      state.user = { fullName: "", email: "" };
      state.loading = true;
    },
  },
});

export default user.reducer;

const { login_user, logout_user } = user.actions;

/* Function:    loadUser
 * Parameters:  No parameters.
 * Return:      Void
 * Purpose:     This function fetches a user from the database and stores it in
 *              the user slice state.
 */
export const loadUser = () => async (dispatch: (setAlert: any) => void) => {
  try {
    const { data } = await axios.get("/auth/user");

    dispatch(login_user(data.user));
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

/* Function:    login
 * Parameters:  A User object.
 * Return:      Void
 * Purpose:     This function sends a user object to the API, receives a new user
 *              document and access token, and stores the user document in the user
 *              slice state.
 */
export const login = (user: LoginData) => async (
  dispatch: (setAlert: any) => void
) => {
  axios.defaults.headers.withCredentials = true;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post("/user/login", user, config);

    // set the x-auth-token header for all routes
    setAuthToken(data.accessToken);

    dispatch(login_user(data.user));
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

/* Function:    register
 * Parameters:  A User object.
 * Return:      Void
 * Purpose:     This function sends a user object to the API, receives a new user
 *              document and access token, and stores the user document in the user
 *              slice state.
 */
export const register = (user: RegisterData) => async (
  dispatch: (setAlert: any) => void
) => {
  axios.defaults.headers.withCredentials = true;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post("/user/register", user, config);

    setAuthToken(data.accessToken);

    dispatch(login_user(data.user));
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

/* Function:    refresh
 * Parameters:  No parameters.
 * Return:      Void
 * Purpose:     This function fetches an access token and stores it in the request
 *              headers. This function also fetches the current user and the profile
 *              associated with the current user and inserts this data into
 *              the Redux store.
 */
export const refresh = () => async (dispatch: (set_alert: any) => void) => {
  try {
    const { data } = await axios.get("/auth/token");

    setAuthToken(data.accessToken);

    if (data.accessToken) {
      const res = await axios.get("/auth/user");
      dispatch(login_user(res.data));
      dispatch(loadUser());
      dispatch(loadProfile());
    }
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
  }
};

/* Function:    logout
 * Parameters:  No parameters.
 * Return:      Void
 * Purpose:     This function clears all Redux state and authentication information
 *              for the user.
 */
export const logout = () => async (dispatch: (set_alert: any) => void) => {
  try {
    dispatch(logout_user());
    dispatch(clearProfile());
    dispatch(clearAlert());
    await axios.post("/auth/logout");
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

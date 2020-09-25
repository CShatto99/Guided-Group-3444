import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAlert } from "./alert";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  fullName: string;
  email: string;
  phone: number;
  company: string;
  companyCode: number;
  address: string;
  city: string;
  state: string;
  password: string;
  confirmPassword: string;
  companyImage: string;
}

export interface UserState {
  isAuth: boolean;
  user: {
    ID: number | null;
    fullName: string;
  };
  loading: boolean;
}

const user = createSlice({
  name: "user",
  initialState: {
    isAuth: false,
    user: {},
    loading: true,
  } as UserState,
  reducers: {
    load_user(state, action: PayloadAction<UserState>) {
      state.user = action.payload.user;
    },
    login_user(state) {
      localStorage.setItem("isAuth", "true"); // will persist user data
      state.isAuth = true;
      state.loading = false;
    },
    logout_user(state) {
      localStorage.removeItem("isAuth");
      state.isAuth = false;
      state.user = { ID: null, fullName: "" };
      state.loading = true;
    },
  },
});

export default user.reducer;

const { load_user, login_user, logout_user } = user.actions;

export const loadUser = () => async (dispatch: (setAlert: any) => void) => {
  try {
    /* 
      TODO: fetch user ID and fullName, cookie will be send to server
      const { data } = await axios.get('/user')

      dispatch(load_user(data))
    */
  } catch (error) {
    console.log(error.response.data); // remove log after complete implementation
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

export const login = (user: LoginData) => async (
  dispatch: (setAlert: any) => void
) => {
  axios.defaults.headers.withCredentials = true; // allows cookie to be sent to server
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    /* 
      TODO: fetch user access token from api endpoint
      const { data } = await axios.post('/user', user, config)

      setAuthToken(data.accessToken)

      dispatch(login_user())
      dispatch(loadUser())
      dispatch(loadProfile())
    */
    console.log("You are attempting to login with the following data:", user);
    dispatch(login_user());
  } catch (error) {
    console.log(error.response.data); // remove log after complete implementation
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

export const register = (user: RegisterData) => async (
  dispatch: (setAlert: any) => void
) => {
  axios.defaults.headers.withCredentials = true; // allows cookie to be sent to server
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    /* 
      TODO: fetch user access token from api endpoint
      const { data } = await axios.post('/user/register', user, config)

      setAuthToken(data.accessToken)

      dispatch(login_user())
      dispatch(loadUser())
      dispatch(loadProfile())
    */
    console.log(
      "You are attempting to register with the following data:",
      user
    );
  } catch (error) {
    console.log(error.response.data); // remove log after complete implementation
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

export const logout = () => (dispatch: (set_alert: any) => void) => {
  try {
    dispatch(logout_user());
  } catch (error) {
    console.log(error.response.data); // remove log after complete implementation
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

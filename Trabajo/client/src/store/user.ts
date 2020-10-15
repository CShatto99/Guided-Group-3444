import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAlert } from "./alert";
import setAuthToken from '../utils/setAuthToken'
import { loadProfile } from './profile';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserState {
  isAuth: boolean;
  user: {
    ID: string | null;
    fullName: string;
    email: string
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
    login_user(state, action: PayloadAction<UserState>) {
      localStorage.setItem("isAuth", "true"); // will persist user data
      state.isAuth = true;
      state.user = action.payload.user;
      state.loading = false;
    },
    logout_user(state) {
      localStorage.removeItem("isAuth");
      state.isAuth = false;
      state.user = { ID: null, fullName: "", email: "" };
      state.loading = true;
    },
  },
});

export default user.reducer;

const { login_user, logout_user } = user.actions;

export const loadUser = () => async (dispatch: (setAlert: any) => void) => {
  try {
    const {data} = await axios.get('/auth/user')
    dispatch(login_user(data))
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
}

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
      const { data } = await axios.post('/user/login', user, config)

      // set the x-auth-token header for all routes
      setAuthToken(data.accessToken)

      dispatch(login_user(data))
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

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
      const { data } = await axios.post('/user/register', user, config)

      // set the x-auth-token header for all routes
      setAuthToken(data.accessToken)

      dispatch(login_user(data.user))
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

export const refresh = () => async (dispatch: (set_alert: any) => void) => {
  try { 
    const { data } = await axios.get('/auth/token')

    setAuthToken(data.accessToken)

    if(data.accessToken) {
      const res = await axios.get('/auth/user');
      dispatch(login_user(res.data))
      dispatch(loadUser())
      dispatch(loadProfile())
    }
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status))
  }
}

export const logout = () => async (dispatch: (set_alert: any) => void) => {
  try {
    dispatch(logout_user());
    await axios.post('/auth/logout')
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

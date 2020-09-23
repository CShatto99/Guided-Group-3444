import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    isAuth: false,
    user: {},
    loading: true,
  },
  reducers: {
    load_user: (state, action) => {
      return {
        ...state,
        isAuth: true,
        user: action.payload,
        loading: false,
      };
    },
    login_user: (state, action) => {
      return {
        ...state,
        isAuth: true,
        loading: false,
      };
    },
    logout_user: (state, action) => {
      return {
        ...state,
        isAuth: false,
        user: {},
        loading: true,
      };
    },
  },
});

export default user.reducer;

//const { load_user, login_user, logout_user } = user.actions;

export const loadUser = () => (dispatch: () => void) => {
  try {
  } catch (err) {
    console.log(err.response.data);
    // dispatch(setAlert(err.response.data.msg, err.response.status));
  }
};

export const login = () => (dispatch: () => void) => {
  try {
  } catch (err) {
    console.log(err.response.data);
    // dispatch(setAlert(err.response.data.msg, err.response.status));
  }
};

export const logout = () => (dispatch: () => void) => {
  try {
  } catch (err) {
    console.log(err.response.data);
    // dispatch(setAlert(err.response.data.msg, err.response.status));
  }
};

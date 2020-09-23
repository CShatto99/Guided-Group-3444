import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTempVariable } from "typescript";

interface IUser {
  fullName: string;
  email: string;
}

interface UserState {
  isAuth: boolean;
  user: IUser;
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
      state.isAuth = true;
      state.user = action.payload.user;
      state.loading = false;
    },
    logout_user(state, action: PayloadAction<UserState>) {
      state.isAuth = false;
      state.user = { fullName: "", email: "" };
      state.loading = true;
    },
  },
});

export default user.reducer;

const { login_user, logout_user } = user.actions;

export const loginUser = (user: IUser) => (dispatch: () => void) => {};

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import user from "./user";
import alert from "./alert";
import profile from "./profile"

const reducer = combineReducers({
  user,
  alert,
  profile
});

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export default store;

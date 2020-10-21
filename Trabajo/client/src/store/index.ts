import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import user from "./user";
import alert from "./alert";
import profile from "./profile";
import company from "./company";

/* Function:    combineReducers
 * Parameters:  An object containing all Redux reducers.
 * Return:      A Reducer object.
 * Purpose:     This function returns a Redux Reducer object containing all
 *              of the application's Redux reducers.
 */
const reducer = combineReducers({
  user,
  alert,
  profile,
  company,
});

//Sets up a Redux store that will be used to interact with the React app.
const store = configureStore({ reducer });

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//Interface for AlertState objects
export interface AlertState {
  msg: string;
  status: number | null;
}

/* Function:    createlice
 * Parameters:  An object containing the name, initial state, and reducers object of the alert slice.
 * Return:      Slice object
 * Purpose:     This function is used to generate action creators and action types for
 *              the alert reducer and state given a name, initial state, and reducers
 *              object. This function will inject all alert data received from the API
 *              into the React application state.
 */
const alert = createSlice({
  name: "alert",
  initialState: {
    msg: "",
    status: null,
  } as AlertState,
  reducers: {
    set_alert(state, action: PayloadAction<AlertState>) {
      const { msg, status } = action.payload;
      state.msg = msg;
      state.status = status;
    },
    clear_alert(state) {
      state.msg = "";
      state.status = null;
    },
  },
});

export default alert.reducer;

const { set_alert, clear_alert } = alert.actions;

/* Function:    setAlert
 * Parameters:  An error message and status code.
 * Return:      Void
 * Purpose:     This function will accept an error message and status code and dispatch
 *              it to the alert slice.
 */
export const setAlert = (msg: string, status: number) => (
  dispatch: (set_alert: any) => void
) => {
  setTimeout(() => dispatch(clear_alert()), 5000);
  dispatch(set_alert({ msg, status }));
};

/* Function:    clearAlert
 * Parameters:  No parameters.
 * Return:      Slice object
 * Purpose:     This function will dispatch the clear_alert action and remove all alert state
 */
export const clearAlert = () => (dispatch: (clear_alert: any) => void) => {
  dispatch(clear_alert());
};

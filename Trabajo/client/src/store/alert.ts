import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  msg: string;
  status: number | null;
}

interface ISetAlert {
  payload: AlertState;
  type: string;
}

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

export const setAlert = (msg: string, status: number) => (
  dispatch: (set_alert: ISetAlert) => void
) => {
  dispatch(set_alert({ msg, status }));
};

export const clearAlert = () => (dispatch: (clear_alert: any) => void) => {
  dispatch(clear_alert());
};

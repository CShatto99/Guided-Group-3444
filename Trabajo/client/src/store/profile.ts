import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAlert } from "./alert";

export interface Ride {
  dateOfRide: string;
  driver: Profile | null;
  riders: Profile[];
}

//Interface for Profile objects
export interface Profile {
  _id: string;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  long: number;
  rides: Ride[];
  admin: string | null;
  rideDays: string;
  company: string;
  companyID: string;
  userID: string;
}

//Interface for ProfileState objects
export interface ProfileState {
  profile: Profile | null;
  loading: boolean;
}

/* Function:    createlice
 * Parameters:  An object containing the name, initial state, and reducers object of the profile slice.
 * Return:      Slice object.
 * Purpose:     This function is used to generate action creators and action types for
 *              the profile reducer and state given a name, initial state, and reducers
 *              object. This function will inject all profile data received from the API
 *              into the React application state.
 */
const profile = createSlice({
  name: "profile",
  initialState: {
    profile: {},
    loading: true,
  } as ProfileState,
  reducers: {
    /* Will be used to create, update, and delete profile depending on payload */
    load_profile(state, action: PayloadAction<ProfileState>) {
      state.profile = action.payload.profile;
      state.loading = false;
    },
    clear_profile(state) {
      state.profile = null;
      state.loading = true;
    },
  },
});

export default profile.reducer;

const { load_profile, clear_profile } = profile.actions;

export const createCompanyRide = (ride: Ride) => async (
  dispatch: (setAlert: any) => void
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post("/profile/ride", { ride }, config);

    dispatch(load_profile(data));
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

/* Function:    loadProfile
 * Parameters:  No parameters.
 * Return:      Void
 * Purpose:     This function fetches a user profile from the database and stores it in
 *              the profile slice state.
 */
export const loadProfile = () => async (
  dispatch: (load_profile: any) => void
) => {
  try {
    const { data } = await axios.get("/profile");

    dispatch(load_profile(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const updateProfileCompany = (
  company: string,
  companyCode: string
) => async (dispatch: (setAlert: any) => void) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post(
      "/profile/company",
      { company, companyCode },
      config
    );

    dispatch(setAlert("Company status updated!", 200));
    dispatch(load_profile(data));
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

/* Function:    updateProfile
 * Parameters:  A Profile object.
 * Return:      Void
 * Purpose:     This function sends a profile object to the API, receives an updated user
 *              profile, and inserts it into the profile slice state.
 */
export const updateProfile = (profile: any) => async (
  dispatch: (setAlert: any) => void
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post("/profile", profile, config);

    dispatch(setAlert("Profile updated", 200));
    dispatch(load_profile(data));
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

/* Function:    clearProfile
 * Parameters:  No parameters.
 * Return:      Void
 * Purpose:     This function clears the profile slice state.
 */
export const clearProfile = () => async (
  dispatch: (clear_profile: any) => void
) => {
  dispatch(clear_profile());
};

/* Function:    updateProfile
 * Parameters:  No parameters.
 * Return:      Void
 * Purpose:     This function makes a call to the API to delete a profile and clears the
 *              profile slice state.
 */
export const deleteProfile = () => async (dispatch: () => void) => {
  try {
  } catch (error) {
    console.log(error.response);
  }
};

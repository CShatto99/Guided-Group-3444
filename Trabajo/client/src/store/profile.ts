import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAlert } from "./alert";

//Interface for Ride objects
interface Ride {
  dateOfRide: string;
  driverName: string;
  riders: [string];
}

//Interface for Profile objects
export interface Profile {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  coordinates: [number, number];
  rides?: [Ride];
  admin: string | null;
  rideDays: string;
  companyID: number;
}

//Interface for ProfileState objects
export interface ProfileState {
  profile: Profile;
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
  },
});

export default profile.reducer;

const { load_profile } = profile.actions;

/* Function:    loadProfile
 * Parameters:  No parameters.
 * Return:      Void
 * Purpose:     This function fetches a user profile from the database
 */
export const loadProfile = () => async (
  dispatch: (load_profile: PayloadAction<ProfileState>) => void
) => {
  try {
    const { data } = await axios.get("/profile");
    /* data should contain profile information */

    dispatch(load_profile(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const updateProfile = (profile: any) => async (
  dispatch: (setAlert: any) => void
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post(
      "/profile/updateProfile",
      profile,
      config
    );
    console.log(data);
    dispatch(setAlert("Profile updated", 200));
    dispatch(load_profile(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteProfile = () => async (dispatch: () => void) => {
  try {
  } catch (error) {
    console.log(error.response);
  }
};

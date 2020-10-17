import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAlert } from './alert'

interface Ride {
  dateOfRide: string;
  driverName: string;
  riders: [string];
}

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
    companyID: number
}     

export interface ProfileState {
  profile: Profile;
  loading: boolean;
}

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
    const { data } = await axios.post("/profile/updateProfile", profile, config);
    console.log(data)
    dispatch(setAlert("Profile updated", 200))
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

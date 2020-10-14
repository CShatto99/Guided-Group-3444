import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Ride {
  dateOfRide: string;
  driverName: string;
  riders: [string];
}

export interface Profile {
    name: string;
    email: string;
    phoneNum: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    coordinates: [number, number];
    ridesGiven: number;
    milesDriven: number;
    rides: [Ride];
    admin: string | null;
    rideDays: string;
    companyID: number

    // Name
    // - Email
    // - Address
    // - Latitude
    // - Longitude
    // - Number of people given ride to (not on report)
    // - Number of miles saved (not on report)
    // - rides[Ride]
    // - admin - (null or company name)
    // - rideDays - list of weekdays with status of (riding, driving, or neither)
    // - company id
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

export const updateProfile = (profile: Profile) => async (
  dispatch: (load_profile: PayloadAction<ProfileState>) => void
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post("/profile", profile, config);
    /* data should contain updated profile information */
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

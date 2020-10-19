import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAlert } from "./alert";

export interface Company {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  code: string;
  confirmCode: string;
  image: any;
}

export interface CompanyState {
  company: Company;
  loading: boolean;
}

const company = createSlice({
  name: "company",
  initialState: {
    company: {},
    loading: true,
  } as CompanyState,
  reducers: {
    load_company(state, action: PayloadAction<Company>) {
      state.company = action.payload;
      state.loading = false;
    },
  },
});

const { load_company } = company.actions;

export const createCompany = (company: Company) => async (
  dispatch: (setAlert: any) => void
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post("/company/create", company, config);

    dispatch(load_company(data));
    dispatch(setAlert("New company registered successfully!", 200));
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

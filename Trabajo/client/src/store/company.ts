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
  companies: Company[] | null;
  loading: boolean;
}

const company = createSlice({
  name: "company",
  initialState: {
    company: {},
    companies: null,
    loading: true,
  } as CompanyState,
  reducers: {
    load_company(state, action: PayloadAction<Company>) {
      state.company = action.payload;
      state.loading = false;
    },
    load_companies(state, action: PayloadAction<Company[]>) {
      state.companies = action.payload;
      state.loading = false;
    },
  },
});

export default company.reducer;

const { load_company, load_companies } = company.actions;

export const getCompany = () => async (dispatch: (setAlert: any) => void) => {
  try {
    /* TODO
        const { data } = await axios.get('/company');
        
        dispatch(load_company(data));
     */
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

export const getAllCompanies = () => async (
  dispatch: (setAlert: any) => void
) => {
  try {
    const { data } = await axios.get("/company/all");

    dispatch(load_companies(data));
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

export const updateCompany = (company: Company) => async (
  dispatch: (setAlert: any) => void
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    /* TODO
        const { data } = await axios.post('/company', company, config);
        
        dispatch(load_company(data));
     */
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

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

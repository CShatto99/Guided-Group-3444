import { Profile } from "./profile";
import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAlert } from "./alert";

//Interface for Company objects
export interface Company {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  long: number;
  code: string;
  confirmCode: string;
  image: any;
  messages: [string];
}

//Interface for CompanyState objects
export interface CompanyState {
  company: Company;
  members: [Profile] | null;
  companies: Company[] | null;
  loading: boolean;
}

//interface for creating a company
interface createNewCompany {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  code: string;
  confirmCode: string;
  image: any;
  email: string | undefined;
}

interface updateCode {
  email: string;
  company: string;
  oldCode: string;
  newCode: string;
  newCodeConfirm: string;
}

/* Function:    createlice
 * Parameters:  An object containing the name, initial state, and reducers object of the company slice.
 * Return:      Slice object.
 * Purpose:     This function is used to generate action creators and action types for
 *              the company reducer and state given a name, initial state, and reducers
 *              object. This function will inject all company data received from the API
 *              into the React application state.
 */
const company = createSlice({
  name: "company",
  initialState: {
    company: {},
    members: null,
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
    load_members(state, action: PayloadAction<[Profile]>) {
      state.members = action.payload;
      state.loading = false;
    },
  },
});

export default company.reducer;

const { load_company, load_companies, load_members } = company.actions;

export const getCompany = (company: string) => async (
  dispatch: (setAlert: any) => void
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post("/company", { company }, config);

    dispatch(load_company(data));
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

export const getCompanyMembers = (companyID: string) => async (
  dispatch: (setAlert: any) => void
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post(
      "/company/coordinates",
      { companyID },
      config
    );

    dispatch(load_members(data));
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

/* Function:    getAllCompanies
 * Parameters:  No parameters.
 * Return:      Void
 * Purpose:     This function fetches all companies from the database through the API
 *              and insert it into the company slice state
 */
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

/* Function:    createCompany
 * Parameters:  A Company object.
 * Return:      Void
 * Purpose:     This function sends a Company object to the API, receives a new
 *              company document from the API, and inserts it into the company slice state
 */
export const createCompany = (company: createNewCompany) => async (
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
    dispatch(setAlert("New company registered!", 200));
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, error.response.status));
  }
};

export const updateCompanyCode = (update: updateCode) => async (
  dispatch: (setAlert: any) => void ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const msg = {
        email: update.email,
        company: update.company,
        oldCode: update.oldCode,
        newCode: update.newCode,
        newCodeConfirm: update.newCodeConfirm
      }

      const { data } = await axios.post("/company/updateCode", msg, config);
      dispatch(setAlert("Code Updated!", 200));
    } catch (error) {
      dispatch(setAlert(error.response.data.msg, error.response.status));
    }
  };
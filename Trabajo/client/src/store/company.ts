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
  code: string;
  confirmCode: string;
  image: any;
}

//Interface for CompanyState objects
export interface CompanyState {
  company: Company;
  companies: Company[] | null;
  loading: boolean;
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

/* Function:    getCompany
 * Parameters:  No parameters.
 * Return:      Void
 * Purpose:     This function fetches a user company from the database through the API
 *              and insert it into the company slice state
 */
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

/* Function:    updateCompany
 * Parameters:  A Company object.
 * Return:      Void
 * Purpose:     This function sends a Company object to the API, receives an updated
 *              company document from the API, and inserts it into the company slice state
 */
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

/* Function:    createCompany
 * Parameters:  A Company object.
 * Return:      Void
 * Purpose:     This function sends a Company object to the API, receives a new
 *              company document from the API, and inserts it into the company slice state
 */
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

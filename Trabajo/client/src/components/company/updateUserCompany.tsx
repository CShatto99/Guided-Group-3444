import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
  Row,
  Spinner,
  ButtonGroup,
} from "reactstrap";
import { CompanyState, getAllCompanies } from "../../store/company";
import { RootState } from "../../store";
import { UserState } from "../../store/user";
import { ProfileState, updateProfileCompany } from "../../store/profile";
import { AlertState } from "../../store/alert";
import { JoinCompany } from "./JoinCompany";
import "../../css/layoutStyles.css";
import "../../css/updateUserCompany.css";

/* The CreateCompany component is rendered when a user wants to
 * create a new company.
 */
export const UpdateUserCompany: React.FC<{}> = () => {
  //redux state variables
  const dispatch = useDispatch();
  const { isAuth } = useSelector<RootState, UserState>(state => state.user);
  const { profile, loading } = useSelector<RootState, ProfileState>(
    state => state.profile
  );
  const { companies } = useSelector<RootState, CompanyState>(
    state => state.company
  );
  const { msg, status } = useSelector<RootState, AlertState>(
    state => state.alert
  );

  //State variables
  const [name, setName] = useState("Select Company");
  const [code, setCode] = useState("");
  const [image, setImage] = useState("/images/defaultCompany.png");
  const [page, setPage] = useState("join");

  /* useEffect is called when the component loads or when any of the state
   * variables in the array included at the end of the function is updated.
   * We use it here to load the companies from the API and populate the
   * form.
   */

  useEffect(() => {
    if (isAuth) {
      dispatch(getAllCompanies());
    } else if (isAuth && profile) {
      setName(profile.company);
      companies?.map(c => {
        if (c.name === profile.company) setImage(c.image);
      });
      if (companies) {
        setName(companies[0].name);
      }
    }
  }, [isAuth, profile, companies, dispatch]);

  /* Function:    handleSubmit
   * Parameters:  e: React.ChangeEvent<HTMLInputElement> - event from HTML form
   * Return:      void
   * Purpose:     This function is called when the user submits the form.  It
   *              creates the json object that is expected by the createCompany
   *              endpoint on the API server, then requests the server to add the
   *              company.  If the result is a failure, it updates the variables
   *              that will inform the user of the errors.  If the result is a success
   *              the user is informed.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //prevent standard form behavior
    e.preventDefault();

    dispatch(updateProfileCompany(name, code));
  };

  //return html form
  return loading ? (
    <Spinner />
  ) : (
    <>
      <ButtonGroup>
        <Button onClick={() => setPage("join")}>Join Company</Button>
        <Button onClick={() => setPage("create")}>Create Company</Button>
      </ButtonGroup>
      {page === "join" && <JoinCompany />}
    </>
  );
};

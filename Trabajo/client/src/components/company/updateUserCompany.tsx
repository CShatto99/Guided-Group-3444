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
import { CreateCompany } from "./CreateCompany";
import "../../css/layoutStyles.css";
import "../../css/updateUserCompany.css";

/* The CreateCompany component is rendered when a user wants to
 * create a new company.
 */
export const UpdateUserCompany: React.FC<{}> = () => {
  //redux state variables
  const dispatch = useDispatch();
  const { loading } = useSelector<RootState, ProfileState>(
    state => state.profile
  );

  //State variables
  const [page, setPage] = useState("join");

  //return html form
  return loading ? (
    <Spinner />
  ) : (
    <div className="update-comp-container">
      <ButtonGroup className="page-btns">
        <Button
          className={page === "join" ? "ride-btn-active" : "ride-btn"}
          onClick={() => setPage("join")}
        >
          Join Company
        </Button>
        <Button
          className={page === "create" ? "ride-btn-active" : "ride-btn"}
          onClick={() => setPage("create")}
        >
          Create Company
        </Button>
      </ButtonGroup>
      {page === "join" ? <JoinCompany /> : <CreateCompany />}
    </div>
  );
};

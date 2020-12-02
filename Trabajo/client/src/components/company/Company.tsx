import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Spinner, ButtonGroup } from "reactstrap";
import { RootState } from "../../store";
import { ProfileState } from "../../store/profile";
import { JoinCompany } from "./JoinCompany";
import { CreateCompany } from "./CreateCompany";
import "../../css/layoutStyles.css";
import "../../css/company.css";

/* The CreateCompany component is rendered when a user wants to
 * create a new company.
 */
export const UpdateUserCompany: React.FC<{}> = () => {
  //redux state variables
  const { loading } = useSelector<RootState, ProfileState>(
    state => state.profile
  );

  //State variables
  const [page, setPage] = useState("join");

  //return html form
  return loading ? (
    <div className="spinner-wrapper">
      <Spinner />
    </div>
  ) : (
    <div className="company-container">
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
      <div className="update-comp-container">
        {page === "join" ? <JoinCompany /> : <CreateCompany />}
      </div>
    </div>
  );
};

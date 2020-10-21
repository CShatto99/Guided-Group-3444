import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import "./layoutStyles.css";
import states from "../../json/states.json";
import Axios from "axios";
import { idText } from "typescript";
import { CompanyState, getAllCompanies } from "../../store/company";
import { RootState } from "../../store";
import { UserState } from "../../store/user";
import { ProfileState } from "../../store/profile";

// Interface for defining props for CreateCompany page
interface updateUserCompanyProps {}

/* The CreateCompany component is rendered when a user wants to
 * create a new company.
 */
export const UpdateUserCompany: React.FC<updateUserCompanyProps> = () => {
  //redux state variables
  const dispatch = useDispatch();
  const { loading } = useSelector<RootState, UserState>(state => state.user);
  const profileState = useSelector<RootState, ProfileState>(
    state => state.profile
  );
  const { company, companies } = useSelector<RootState, CompanyState>(
    state => state.company
  );

  //State variables
  const [ID, setID] = useState("");
  const [name, setName] = useState("Select Company");
  const [code, setCode] = useState("");
  const [image, setImage] = useState("/images/defaultCompany.png");

  /* useEffect is called when the component loads or when any of the state
   * variables in the array included at the end of the function is updated.
   * We use it here to load the companies from the API and populate the
   * form.
   */
  useEffect(() => {
    //if the redux state is done loading get the companies from the API.
    if (!loading) {
      dispatch(getAllCompanies());
    }

    // if (profile) {
    //   setName(profile.company);
    //   setCode(profile.companyID);
    // }
  }, [loading]);

  useEffect(() => {
    const { profile } = profileState;
    setName(profile.company);
    setCode(profile.companyCode);
  }, [profileState.loading]);
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
  let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //prevent standard form behavior
    e.preventDefault();

    //create request object
    let requestObject: Object = {
      id: ID,
      code: code,
    };

    //TODO: send form to Redux to send to API
  };

  console.log(profileState);

  console.log(name, code);

  //return html form
  return (
    <div>
      <Button onClick={() => dispatch(getAllCompanies())}>Get companies</Button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={"registerContainer"}>
          <div className={"formContainer"}>
            <h1>Join A New Company</h1>
            <Form
              onSubmit={(e: React.ChangeEvent<HTMLFormElement>) =>
                handleSubmit(e)
              }
            >
              <FormGroup row>
                <Label for="companies" sm={3}>
                  Select Company
                </Label>
                <Col>
                  <Input
                    type="select"
                    name="companies"
                    id="companies"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setName(e.target.value)
                    }
                    sm={9}
                  >
                    {companies &&
                      companies.map(val => {
                        return <option key={val.name}>{val.name}</option>;
                      })}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="code" sm={3}>
                  Company Code
                </Label>
                <Col>
                  <Input
                    type="password"
                    name="code"
                    id="company"
                    placeholder="************"
                    required
                    value={code}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCode(e.target.value)
                    }
                    sm={9}
                  />
                </Col>
              </FormGroup>
              <FormGroup
                row
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Button className={"submitButton"} type="submit">
                  Register
                </Button>
              </FormGroup>
            </Form>
          </div>
          <div className={"companyInfo"}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={image === "" ? "/images/defaultCompany.png" : image}
                alt="companyPhoto"
                className={"companyInfoPic"}
                style={{ minHeight: "50vh" }}
              />
            </div>
          </div>
        </div>
        <div
          className={"formContainer"}
          style={{
            display: "flex",
            width: "auto",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "25px",
          }}
        >
          <h3>Is your company not listed? Create it here:</h3>
          <Button
            style={{ marginLeft: "15px" }}
            className={"navButton"}
            href="/userHome/createCompany"
          >
            Create Company
          </Button>
        </div>
      </div>
    </div>
  );
};

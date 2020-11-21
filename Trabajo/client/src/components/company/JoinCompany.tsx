import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  Alert,
  Spinner,
} from "reactstrap";
import { CompanyState, getAllCompanies } from "../../store/company";
import { RootState } from "../../store";
import { UserState } from "../../store/user";
import { ProfileState, updateProfileCompany } from "../../store/profile";
import { AlertState } from "../../store/alert";

export const JoinCompany: React.FC<{}> = () => {
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

  const [name, setName] = useState("Select Company");
  const [code, setCode] = useState("");
  const [image, setImage] = useState("/images/defaultCompany.png");

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

  return loading ? (
    <Spinner />
  ) : (
    <Row className="update-comp-container">
      <Col xs={12} lg={6} className="gen-container">
        {msg && status === 200 && <Alert color="success">{msg}</Alert>}
        {msg && status && status !== 200 && <Alert color="danger">{msg}</Alert>}
        <h1>Join A New Company</h1>
        <Form
          onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => handleSubmit(e)}
          className="p-3"
        >
          <FormGroup row>
            <Label for="companies">Select Company</Label>
            <Input
              type="select"
              name="companies"
              id="companies"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
                companies &&
                  companies.forEach(c => {
                    if (c.name === e.target.value) setImage(c.image);
                  });
              }}
            >
              {companies &&
                companies.map(val => {
                  return <option key={val.name}>{val.name}</option>;
                })}
            </Input>
          </FormGroup>
          <FormGroup row>
            <Label for="code">Company Code</Label>
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
            />
          </FormGroup>
          <Button className={"submitButton"} type="submit">
            Register
          </Button>
        </Form>
      </Col>
      <Col xs={12} lg={6} className="img-container">
        <img src={image} alt="companyPhoto" className="crt-company-img" />
      </Col>
      <Col xs={12} className="crt-cmp-container">
        <h3>Is your company not listed? Create it here:</h3>
        <Button
          type="button"
          style={{ marginLeft: "15px" }}
          className={"navButton"}
          href="/userHome/createCompany"
        >
          Create Company
        </Button>
      </Col>
    </Row>
  );
};

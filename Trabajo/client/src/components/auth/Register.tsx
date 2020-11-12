import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
} from "reactstrap";
import { register } from "../../store/user";
import { RootState } from "../../store/index";
import { AlertState } from "../../store/alert";
import { UserState } from "../../store/user";
import "../../css/authForm.css";

/* The Register page is where users can sign up to use our application. Upon registering they are
 * automatically logged in and redirected to the updateProfile page
 */
export const Register: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector<RootState, UserState>(state => state.user);
  const { msg } = useSelector<RootState, AlertState>(state => state.alert);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* Function:    handleSubmit
   * Parameters:  e: React.ChangeEvent<HTMLInputElement> - event from HTML form
   * Return:      void
   * Purpose:     This function is called when the user submits the form.  It
   *              creates the json object that is expected by the register
   *              endpoint on the API server, then requests the server to create the
   *              new user.  If the result is a failure, it updates the variables
   *              that will inform the user of the errors.  If the result is a success
   *              the user is informed.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //prevent standard form behavior
    e.preventDefault();

    //create object to register with
    const user = {
      fullName,
      email,
      password,
      confirmPassword,
    };

    //send object to redux to perform register request
    dispatch(register(user));
  };

  //render the form, but if successful register occurs redirect to the user home page
  return isAuth ? (
    <Redirect to="/userHome" />
  ) : (
    <Row className="auth-container">
      <Col xs="1"></Col>
      <Col xs="10" className="auth-container-content">
        <Form
          className="auth-form"
          onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => handleSubmit(e)}
        >
          {msg && <Alert color="danger">{msg}</Alert>}
          <h1>Register for an account</h1>
          <FormGroup row>
            <Label for="fullName">Full Name</Label>
            <Input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Bobby Bobberson"
              value={fullName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFullName(e.target.value)
              }
              sm={9}
            />
          </FormGroup>
          <FormGroup row>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              sm={9}
            />
          </FormGroup>
          <FormGroup row>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="myPassword123!"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              sm={9}
            />
          </FormGroup>
          <FormGroup row>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="myPassword123!"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              sm={9}
            />
          </FormGroup>
          <Col>
            <Button className={"submitButton"} type="submit">
              Register
            </Button>
          </Col>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Form>
      </Col>
      <Col xs="1"></Col>
    </Row>
  );
};

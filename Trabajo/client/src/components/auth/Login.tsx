import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
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
import { login } from "../../store/user";
import { RootState } from "../../store/index";
import { UserState } from "../../store/user";
import { AlertState } from "../../store/alert";
import "../../css/authForm.css";

/* The Login page is where users can login to our system to use our
 * application. This is the first step to gain access to the rest of our system.
 */
const LoginRefactored: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector<RootState, UserState>(state => state.user);
  const { msg } = useSelector<RootState, AlertState>(state => state.alert);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* Function:    handleSubmit
   * Parameters:  e: React.ChangeEvent<HTMLInputElement> - event from HTML form
   * Return:      void
   * Purpose:     This function is called when the user submits the form.  It
   *              creates the json object that is expected by the updateProfile
   *              endpoint on the API server, then requests the server to login the
   *              user.  If the result is a failure, it updates the variables
   *              that will inform the user of the errors.  If the result is a success
   *              the user is informed.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //prevent standard form behavior
    e.preventDefault();

    //create the object to login with
    const user = {
      email,
      password,
    };

    //send the login request to redux
    dispatch(login(user));
  };

  return isAuth ? (
    <Redirect push to="/userHome" />
  ) : (
    <Row className="auth-container">
      <Col xs="1"></Col>
      <Col xs="10" className="auth-container-content">
        <Form className="auth-form" onSubmit={e => handleSubmit(e)}>
          {msg && <Alert color="danger">{msg}</Alert>}
          <h1>Login to your account</h1>
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
          <Col>
            <Button className={"submitButton"} type="submit">
              Login
            </Button>
          </Col>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </Form>
      </Col>
      <Col xs="1"></Col>
    </Row>
  );
};

export default LoginRefactored;

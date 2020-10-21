import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import { login } from "../../store/user";
import { RootState } from "../../store/index";
import { UserState } from "../../store/user";
import { AlertState } from "../../store/alert";

// Interface for defining props for Login page
interface LoginProps {}

/* The Login page is where users can login to our system to use our
 * application. This is the first step to gain access to the rest of our system.
 */
export const Login: React.FC<LoginProps> = () => {
  //state variables
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

  // If the user has successfully logged in then redirect them to the UserHome page.
  // Otherwise render the form.
  return isAuth ? (
    <Redirect push to="/userHome" />
  ) : (
    <div>
      <div className={"formContainer"}>
        <h1>Please Login</h1>
        <Form onSubmit={e => handleSubmit(e)}>
          {msg && (
            <FormGroup row>
              <Col>
                <Alert color="danger">{msg}</Alert>
              </Col>
            </FormGroup>
          )}

          <FormGroup row>
            <Label for="email" sm={3}>
              Email
            </Label>
            <Col>
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
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={3}>
              Password
            </Label>
            <Col>
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
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col>
              <Button className={"submitButton"} type="submit">
                Login
              </Button>
            </Col>
          </FormGroup>
        </Form>
        <Button className={"submitButton"} href="/forgotPassword">
          Forgot Password
        </Button>
      </div>
    </div>
  );
};

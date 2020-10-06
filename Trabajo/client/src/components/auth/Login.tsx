import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import profile from "../../store/profile";

// Interface for defining props for Login page
interface LoginProps {}

/* The Login page is where users can login to our system to use our
 * application. This is the first step to gain access to the rest of our system.
 */
export const Login: React.FC<LoginProps> = () => {
  //state variables
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

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
    e.preventDefault();

    let msg = "send form to API: \n";
    msg += `email: ${userEmail}\n`;
    msg += `password: ${userPass}`;
    alert(msg);

    //on success update global profile state

    //after state updated redirect to user home
    setLoginSuccess(true);
  };

  // If the user has successfully logged in then redirect them to the UserHome page.
  // Otherwise render the form.
  return loginSuccess ? (
    <Redirect push to="/userHome" />
  ) : (
    <div>
      <div className={"formContainer"}>
        <h1>Please Login</h1>
        <Form onSubmit={(e) => handleSubmit(e)}>
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
                required
                value={userEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserEmail(e.target.value)
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
                required
                value={userPass}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserPass(e.target.value)
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

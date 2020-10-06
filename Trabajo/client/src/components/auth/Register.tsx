import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import states from "../../json/states.json";
import { register } from "../../store/user";

/* Interface for defining props for Register page
 */
interface RegisterProps {}

/* The Register page is where users can sign up for using our application.
 */
export const Register: React.FC<RegisterProps> = () => {
  //state variables
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

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
    e.preventDefault();
    let alertMessage = `name: ${fullName}\n`;
    alertMessage += `email: ${email}\n`;
    alertMessage += `password: ${password}\n`;
    alert(`TODO, send form to api:\n${alertMessage}`);

    //this will value will be updated in the fetch
    setRegisterSuccess(true);
  };

  //render the form
  return registerSuccess ? (
    <div>
      <div className={"formContainer"}>
        <h1>Success!</h1>
        <Button className={"submitButton"} href="/login" size="lg">
          Proceed to Login
        </Button>
      </div>
    </div>
  ) : (
    <div>
      <div className={"formContainer"}>
        <h1>Register</h1>
        <Form
          onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => handleSubmit(e)}
        >
          <FormGroup row>
            <Label for="fullName" sm={3}>
              Full Name
            </Label>
            <Col>
              <Input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Bobby Bobberson"
                required
                value={fullName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFullName(e.target.value)
                }
                sm={9}
              />
            </Col>
          </FormGroup>
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
                required
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                sm={9}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="confirmPassword" sm={3}>
              Confirm Password
            </Label>
            <Col>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="myPassword123!"
                required
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                sm={9}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col>
              <Button className={"submitButton"} type="submit">
                Register
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

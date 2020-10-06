import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import profile from "../../store/profile";

/* Interface for defining props for Login page
 */
interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

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

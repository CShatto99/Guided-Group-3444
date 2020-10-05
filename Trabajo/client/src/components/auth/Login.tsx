import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import profile from "../../store/profile";

/* Interface for defining props for Login page
 */
interface LoginProps {}

/* Interface for defining the State of the Login page
 */
interface LoginState {
  email: string;
  password: string;
}

export const Login: React.FC<LoginState> = () => {
  let userEmail: string = "";
  let userPass: string = "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let msg = "send form to API: \n";
    msg += `email: ${userEmail}\n`;
    msg += `password: ${userPass}`;
    alert(msg);

    //on success update global profile state

    //after state updated redirect to user home
  };

  return (
    <div>
      <div className={"loginregContainer"}>
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
                value={userEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  (userEmail = e.target.value)
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
                value={userPass}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  (userPass = e.target.value)
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

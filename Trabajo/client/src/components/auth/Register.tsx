import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import states from "../../json/states.json";
import { register } from "../../store/user";

/* Interface for defining props for Register page
 */
interface RegisterProps {}

/* Interface for defining the State of the Register page
 */
interface RegisterState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  registerSuccess: boolean;
}

export class Register extends React.Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      registerSuccess: false,
    };
  }

  handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let alertMessage = `name: ${this.state.fullName}\n`;
    alertMessage += `email: ${this.state.email}\n`;
    alertMessage += `password: ${this.state.password}\n`;
    alert(`TODO, send form to api:\n${alertMessage}`);

    //this will value will be updated in the fetch
    this.setState({ registerSuccess: true });
  };

  render() {
    return this.state.registerSuccess ? (
      <div>
        <div className={"loginregContainer"}>
          <h1>Success!</h1>
          <Button className={"submitButton"} href="/login" size="lg">
            Proceed to Login
          </Button>
        </div>
      </div>
    ) : (
      <div>
        <div className={"loginregContainer"}>
          <h1>Register</h1>
          <Form onSubmit={this.handleSubmit}>
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
                  value={this.state.fullName}
                  onChange={this.handleStateChange}
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
                  value={this.state.email}
                  onChange={this.handleStateChange}
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
                  value={this.state.password}
                  onChange={this.handleStateChange}
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
                  value={this.state.confirmPassword}
                  onChange={this.handleStateChange}
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
  }
}

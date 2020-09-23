import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { login } from "../../store/user";

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
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // let alertMessage = `TODO send form to API:\nemail: ${email}\npassword: ${password}`;
    // alert(alertMessage);
    dispatch(login({ email, password }));
  };

  return (
    <div>
      <div className={"mainContentArea"}>
        <div className={"loginregContainer"}>
          <h1>Please Login</h1>
          <Form onSubmit={e => handleSubmit(e)}>
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
    </div>
  );
};

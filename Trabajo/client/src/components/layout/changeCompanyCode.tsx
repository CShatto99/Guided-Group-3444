import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import profile from "../../store/profile";

/* Interface for defining props for Login page
 */
interface ChangeCompanyCodeProps {}

export const ChangeCompanyCode: React.FC<ChangeCompanyCodeProps> = () => {
  const [originalCode, setOriginalCode] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newCodeCheck, setNewCodeCheck] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let msg = "send form to API: \n";
    msg += `original code: ${originalCode}\n`;
    msg += `new code: ${newCode}\n`;
    msg += `new code check: ${newCodeCheck}`;
    alert(msg);

    //send form to API
  };

  return (
    <div>
      <div className={"formContainer"}>
        <h1>Change Company Code</h1>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <FormGroup row>
            <Label for="originalCode" sm={3}>
              Original Code
            </Label>
            <Col>
              <Input
                type="password"
                name="originalCode"
                id="originalCode"
                placeholder="************"
                required
                value={originalCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setOriginalCode(e.target.value)
                }
                sm={9}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="newCode" sm={3}>
              New Code
            </Label>
            <Col>
              <Input
                type="password"
                name="newCode"
                id="newCode"
                placeholder="************"
                required
                value={newCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewCode(e.target.value)
                }
                sm={9}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="newCodeCheck" sm={3}>
              Confirm New Code
            </Label>
            <Col>
              <Input
                type="password"
                name="newCodeCheck"
                id="newCodeCheck"
                placeholder="************"
                required
                value={newCodeCheck}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewCodeCheck(e.target.value)
                }
                sm={9}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col>
              <Button className={"submitButton"} type="submit">
                Update
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

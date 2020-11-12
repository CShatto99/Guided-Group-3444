import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { RootState } from "../../store";
import { UserState } from "../../store/user";

// Interface for defining props for ChangeCompanyCode page
interface ChangeCompanyCodeProps {}

/* ChangeCompanyCode is rendered when a user is an admin of a company and
 * they need to change the code for whatever reason
 */
export const ChangeCompanyCode: React.FC<ChangeCompanyCodeProps> = () => {
  const { isAuth } = useSelector<RootState, UserState>(state => state.user);
  //state variables
  const [originalCode, setOriginalCode] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newCodeCheck, setNewCodeCheck] = useState("");

  /* Function:    handleSubmit
   * Parameters:  e: React.ChangeEvent<HTMLInputElement> - event from HTML form
   * Return:      void
   * Purpose:     This function is called when the user submits the form.  It
   *              creates the json object that is expected by the createCompany
   *              endpoint on the API server, then requests the server to update the
   *              company code.  If the result is a failure, it updates the variables
   *              that will inform the user of the errors.  If the result is a success
   *              the user is informed.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //prevent standard form behavior
    e.preventDefault();

    //TODO this isa placeholder until we implement this functionality in redux
    let msg = "send form to API: \n";
    msg += `original code: ${originalCode}\n`;
    msg += `new code: ${newCode}\n`;
    msg += `new code check: ${newCodeCheck}`;
    alert(msg);

    //send form to API
  };

  //render the form
  return (
    <div>
      <div className={"formContainer"}>
        <h1>Change Company Code</h1>
        <Form onSubmit={e => handleSubmit(e)}>
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

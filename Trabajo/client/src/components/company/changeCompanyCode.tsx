import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { RootState } from "../../store";
import { AlertState } from "../../store/alert";
import { updateCompanyCode } from "../../store/company";
import { ProfileState } from "../../store/profile";

/* ChangeCompanyCode is rendered when a user is an admin of a company and
 * they need to change the code for whatever reason
 */
export const ChangeCompanyCode: React.FC = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector<RootState, ProfileState>(
    state => state.profile
  );
  const { msg, status } = useSelector<RootState, AlertState>(
    state => state.alert
  );
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

    if(profile) {
      const update = {
        email: profile.email,
        company: profile.company,
        oldCode: originalCode,
        newCode,
        newCodeConfirm: newCodeCheck
      }

      //send form to API
      dispatch(updateCompanyCode(update));
    }
  };

  //render the form
  return (
    <div>
      {msg && status === 200 && <Alert color="success">{msg}</Alert>}
      {msg && status && status !== 200 && <Alert color="danger">{msg}</Alert>}
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

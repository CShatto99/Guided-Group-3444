import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
} from "reactstrap";
import states from "../../json/states.json";
import { RootState } from "../../store";
import { ProfileState, updateProfile } from "../../store/profile";
import { UserState } from "../../store/user";
import { AlertState } from "../../store/alert";
import "../../css/updateProfile.css";
import { Redirect } from "react-router-dom";

// Interface for defining the props for the UpdateProfile page
interface updateProfileProps {}

/* The UpdateProfile page is where the user can update their profile
 * information.  If the user has just registered and does not yet have
 * profile information, they are first redirected to this page on login.
 */
export const UpdateProfile: React.FC<updateProfileProps> = () => {
  //redux state variables
  const dispatch = useDispatch();
  const { profile, loading } = useSelector<RootState, ProfileState>(
    state => state.profile
  );
  const { user, isAuth } = useSelector<RootState, UserState>(
    state => state.user
  );
  const { msg, status } = useSelector<RootState, AlertState>(
    state => state.alert
  );

  //state variables for address
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  //state variables for weekday preferences
  const [rideDays, setRideDays] = useState<string[]>(["0","0","0","0","0","0","0"]);

  /* useEffect is called when the page is first loaded and when the variables
   * in the array included at the end of the function are changed.  We use it
   * here to dynamically load the profile of the user into the fields so that
   * the user sees their current profile.  It will load the profile once the
   * profile is done loading from redux.
   */
  useEffect(() => {
    //if the profile is done loading and actually exists populate the state variables
    if (!loading && profile) {
      setAddress(profile.address);
      setCity(profile.city);
      setState(profile.state);
      setZip(profile.zip);
      setRideDays(profile.rideDays.split(""));
    }
  }, [loading]);

  /* Function:    handleRideDays
   * Parameters:  index: number - the index that is changing in the rideDays array
   * Return:      void
   * Puprose:     Handles when a user updates the days they need a ride for.  If
   *              the day they are updating is set to true, it simply sets it to
   *              false and vice versa.
   */
  const handleRideDays = (index: number) => {
    //get the current state
    const newRideDays = [...rideDays];

    //update the index that was switched
    newRideDays[index] = newRideDays[index] === "1" ? "0" : "1";

    //set the new state
    setRideDays(newRideDays);
  };

  /* Function:    handleSubmit
   * Parameters:  e: React.FormEvent<HTMLFormElement> - event that is triggered by form submission
   * Return:      void
   * Puprose:     Handles the submit action when a user selects the update profile
   *              option.  It builds the object to be sent to be updated, then calls
   *              the redux function to send the form to the API.  The response is handled
   *              with the redux alert variable above.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //prevent standard form behavior
    e.preventDefault();

    //build object to send to API
    const newUserProfile = {
      name: user.fullName,
      email: user.email,
      address,
      state,
      city,
      zip,
      rideDays: rideDays.join(""),
    };

    //Send object to redux, which will make the profile update request
    dispatch(updateProfile(newUserProfile));
  };

  //render the form
  return !isAuth && !loading ? (
    <Redirect push to="/login" />
  ) : (
    <div className={"registerContainer"}>
      <div
        className={"formContainer"}
        style={{ width: "80%", maxWidth: "72rem" }}
      >
        {msg && status === 200 && <Alert color="success">{msg}</Alert>}
        {msg && status && status !== 200 && <Alert color="danger">{msg}</Alert>}
        <h1>Update Address</h1>
        <Form onSubmit={e => handleSubmit(e)}>
          <FormGroup row>
            <Label for="address" sm={3}>
              Address
            </Label>
            <Col>
              <Input
                type="text"
                name="Address"
                id="address"
                value={address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAddress(e.target.value)
                }
                sm={9}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="city" sm={3}>
              City
            </Label>
            <Col>
              <Input
                type="text"
                name="City"
                id="city"
                value={city}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCity(e.target.value)
                }
                sm={4}
              />
            </Col>
            <Label for="state" sm={2}>
              State
            </Label>
            <Col>
              <Input
                type="select"
                name="State"
                id="state"
                value={state}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setState(e.target.value)
                }
                sm={1}
              >
                {states.map(value => {
                  return <option key={value}>{value}</option>;
                })}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="zip" sm={3}>
              Zipcode
            </Label>
            <Col>
              <Input
                type="text"
                name="zip"
                id="zip"
                value={zip}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setZip(e.target.value)
                }
                sm={9}
              />
            </Col>
          </FormGroup>
          <h1>Choose Ride Days</h1>
          <FormGroup row>
            <Label for="monday" sm={3}>
              Monday
            </Label>
            <Col style={{ display: "flex" }}>
              <ButtonGroup color="danger" style={{ width: "100%" }}>
                <Button
                  type="button"
                  className={
                    rideDays[0] === "0" ? "ride-btn-active" : "ride-btn"
                  }
                  onClick={() => handleRideDays(0)}
                >
                  Not Riding
                </Button>
                <Button
                  type="button"
                  className={
                    rideDays[0] === "1" ? "ride-btn-active" : "ride-btn"
                  }
                  onClick={() => handleRideDays(0)}
                >
                  Riding
                </Button>
              </ButtonGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="tuesday" sm={3}>
              Tuesday
            </Label>
            <Col>
              <ButtonGroup color="danger" style={{ width: "100%" }}>
                <Button
                  type="button"
                  className={
                    rideDays[1] === "0" ? "ride-btn-active" : "ride-btn"
                  }
                  onClick={() => handleRideDays(1)}
                >
                  Not Riding
                </Button>
                <Button
                  type="button"
                  className={
                    rideDays[1] === "1" ? "ride-btn-active" : "ride-btn"
                  }
                  onClick={() => handleRideDays(1)}
                >
                  Riding
                </Button>
              </ButtonGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="wednesday" sm={3}>
              Wednesday
            </Label>
            <Col>
              <ButtonGroup color="danger" style={{ width: "100%" }}>
                <Button
                  type="button"
                  className={
                    rideDays[2] === "0" ? "ride-btn-active" : "ride-btn"
                  }
                  onClick={() => handleRideDays(2)}
                >
                  Not Riding
                </Button>
                <Button
                  type="button"
                  className={
                    rideDays[2] === "1" ? "ride-btn-active" : "ride-btn"
                  }
                  onClick={() => handleRideDays(2)}
                >
                  Riding
                </Button>
              </ButtonGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="thursday" sm={3}>
              Thursday
            </Label>
            <Col>
              <ButtonGroup color="danger" style={{ width: "100%" }}>
                <Button
                  type="button"
                  className={
                    rideDays[3] === "0" ? "ride-btn-active" : "ride-btn"
                  }
                  onClick={() => handleRideDays(3)}
                >
                  Not Riding
                </Button>
                <Button
                  type="button"
                  className={
                    rideDays[3] === "1" ? "ride-btn-active" : "ride-btn"
                  }
                  onClick={() => handleRideDays(3)}
                >
                  Riding
                </Button>
              </ButtonGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="friday" sm={3}>
              Friday
            </Label>
            <Col>
              <ButtonGroup color="danger" style={{ width: "100%" }}>
                <Button
                  type="button"
                  className={
                    rideDays[4] === "0" ? "ride-btn-active" : "ride-btn"
                  }
                  onClick={() => handleRideDays(4)}
                >
                  Not Riding
                </Button>
                <Button
                  type="button"
                  className={
                    rideDays[4] === "1" ? "ride-btn-active" : "ride-btn"
                  }
                  onClick={() => handleRideDays(4)}
                >
                  Riding
                </Button>
              </ButtonGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="saturday" sm={3}>
              Saturday
            </Label>
            <Col>
              <ButtonGroup color="danger" style={{ width: "100%" }}>
                <Button
                  type="button"
                  className={
                    rideDays[5] === "0" ? "ride-btn-active" : "ride-btn"
                  }
                  onClick={() => handleRideDays(5)}
                >
                  Not Riding
                </Button>
                <Button
                  type="button"
                  className={
                    rideDays[5] === "1" ? "ride-btn-active" : "ride-btn"
                  }
                  onClick={() => handleRideDays(5)}
                >
                  Riding
                </Button>
              </ButtonGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="sunday" sm={3}>
              Sunday
            </Label>
            <Col>
              <ButtonGroup color="danger" style={{ width: "100%" }}>
                <Button
                  type="button"
                  className={
                    rideDays[6] === "0" ? "ride-btn-active" : "ride-btn"
                  }
                  onClick={() => handleRideDays(6)}
                >
                  Not Riding
                </Button>
                <Button
                  type="button"
                  className={
                    rideDays[6] === "1" ? "ride-btn-active" : "ride-btn"
                  }
                  onClick={() => handleRideDays(6)}
                >
                  Riding
                </Button>
              </ButtonGroup>
            </Col>
          </FormGroup>
          <FormGroup row style={{ textAlign: "center" }}>
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

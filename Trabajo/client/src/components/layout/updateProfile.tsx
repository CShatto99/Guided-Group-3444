import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
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
import { Profile, ProfileState, updateProfile } from "../../store/profile";
import { UserState } from "../../store/user";
import { AlertState } from "../../store/alert";
import "../../css/updateProfile.css";

// Interface for defining the props for the UpdateProfile page
interface updateProfileProps {}

/* The UpdateProfile page is where the user can update their profile
 * information.  If the user has just registered and does not yet have
 * profile information, they are first redirected to this page on login.
 */
export const UpdateProfile: React.FC<updateProfileProps> = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector<RootState, ProfileState>(
    state => state.profile
  );
  const { user } = useSelector<RootState, UserState>(state => state.user);
  const { msg } = useSelector<RootState, AlertState>(state => state.alert);

  const [userProfile, setUserProfile] = useState({});
  const [sendUpdate, setSendUpdate] = useState(false);
  //state variables for address
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  //state variables for weekday preferences
  const [rideDays, setRideDays] = useState(new Array(7).fill(0));

  useEffect(() => {
    if (!loading && profile) {
      setUserProfile(profile);
      setAddress(profile.address);
      setCity(profile.city);
      setState(profile.state);
      setZip(profile.zip);
    }

    if (sendUpdate) {
      dispatch(updateProfile(userProfile));
      setSendUpdate(false);
    }
  }, [loading, sendUpdate]);

  const handleRideDays = (index: number) => {
    const newRideDays = [...rideDays];
    newRideDays[index] = newRideDays[index] === 1 ? 0 : 1;
    setRideDays(newRideDays);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUserProfile = {
      name: user.fullName,
      email: user.email,
      address,
      state,
      city,
      zip,
      rideDays: rideDays.join(""),
    };

    setUserProfile(newUserProfile);
    setSendUpdate(true);
  };

  if (!localStorage.getItem("isAuth")) return <Redirect to="/login" />;

  //render the form
  return (
    <div className={"registerContainer"}>
      <div
        className={"formContainer"}
        style={{ width: "80%", maxWidth: "72rem" }}
      >
        {msg && <Alert color="success">{msg}</Alert>}
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
                  className={rideDays[0] === 0 ? "ride-btn-active" : "ride-btn"}
                  onClick={() => handleRideDays(0)}
                >
                  Not Riding
                </Button>
                <Button
                  type="button"
                  className={rideDays[0] === 1 ? "ride-btn-active" : "ride-btn"}
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
                  className={rideDays[1] === 0 ? "ride-btn-active" : "ride-btn"}
                  onClick={() => handleRideDays(1)}
                >
                  Not Riding
                </Button>
                <Button
                  type="button"
                  className={rideDays[1] === 1 ? "ride-btn-active" : "ride-btn"}
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
                  className={rideDays[2] === 0 ? "ride-btn-active" : "ride-btn"}
                  onClick={() => handleRideDays(2)}
                >
                  Not Riding
                </Button>
                <Button
                  type="button"
                  className={rideDays[2] === 1 ? "ride-btn-active" : "ride-btn"}
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
                  className={rideDays[3] === 0 ? "ride-btn-active" : "ride-btn"}
                  onClick={() => handleRideDays(3)}
                >
                  Not Riding
                </Button>
                <Button
                  type="button"
                  className={rideDays[3] === 1 ? "ride-btn-active" : "ride-btn"}
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
                  className={rideDays[4] === 0 ? "ride-btn-active" : "ride-btn"}
                  onClick={() => handleRideDays(4)}
                >
                  Not Riding
                </Button>
                <Button
                  type="button"
                  className={rideDays[4] === 1 ? "ride-btn-active" : "ride-btn"}
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
                  className={rideDays[5] === 0 ? "ride-btn-active" : "ride-btn"}
                  onClick={() => handleRideDays(5)}
                >
                  Not Riding
                </Button>
                <Button
                  type="button"
                  className={rideDays[5] === 1 ? "ride-btn-active" : "ride-btn"}
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
                  className={rideDays[6] === 0 ? "ride-btn-active" : "ride-btn"}
                  onClick={() => handleRideDays(6)}
                >
                  Not Riding
                </Button>
                <Button
                  type="button"
                  className={rideDays[6] === 1 ? "ride-btn-active" : "ride-btn"}
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

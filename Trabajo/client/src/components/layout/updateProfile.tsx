import { stringify } from "querystring";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import states from "../../json/states.json";
import { RootState } from "../../store";
import { Profile, ProfileState, updateProfile } from "../../store/profile";
import { UserState } from "../../store/user";

// Interface for defining the props for the UpdateProfile page
interface updateProfileProps {}

/* The UpdateProfile page is where the user can update their profile
 * information.  If the user has just registered and does not yet have
 * profile information, they are first redirected to this page on login.
 */
export const UpdateProfile: React.FC<updateProfileProps> = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector<RootState, ProfileState>( state => state.profile);
  const { user } = useSelector<RootState, UserState>(state => state.user)

  //state variables for address
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  //state variables for weekday preferences
  const [monday, setMonday] = useState("Not Riding");
  const [tuesday, setTuesday] = useState("Not Riding");
  const [wednesday, setWednesday] = useState("Not Riding");
  const [thursday, setThursday] = useState("Not Riding");
  const [friday, setFriday] = useState("Not Riding");
  const [saturday, setSaturday] = useState("Not Riding");
  const [sunday, setSunday] = useState("Not Riding");

  /* Function:    handleAddressSubmit
   * Parameters:  e: React.ChangeEvent<HTMLInputElement> - event from HTML form
   * Return:      void
   * Purpose:     This function is called when the user submits the address update
   *              form.  It creates the json object that is expected by the updateProfileAddress
   *              endpoint on the API server, then requests the server to update the user's
   *              address.  If the result is a failure, it updates the variables
   *              that will inform the user of the errors.  If the result is a success
   *              the user is informed.
   */
  let handleAddressSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //TODO this isn't loaded after initial login so 
    let userProfile: Profile = profile;

    if (JSON.stringify(profile) == "{}") {
      //TODO user isn't loaded after initial login so undefined error is thrown
      userProfile.name = user.fullName;
      userProfile.email = user.email;
    }

    //combine fields for address
    let fullAddress = `${address}, ${city}, ${state}  ${zip}`

    userProfile.address = fullAddress;
    alert(JSON.stringify(userProfile));

    //TODO this is throwing error
    //dispatch(updateProfile(userProfile));
  };

  /* Function:    handleDaySubmit
   * Parameters:  e: React.ChangeEvent<HTMLInputElement> - event from HTML form
   * Return:      void
   * Purpose:     This function is called when the user submits the address update
   *              form.  It creates the json object that is expected by the updateProfileDay
   *              endpoint on the API server, then requests the server to update the ride day
   *              preferences for the user.  If the result is a failure, it updates the variables
   *              that will inform the user of the errors.  If the result is a success
   *              the user is informed.
   */
  let handleDaySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let userProfile: Profile = profile;

    if (JSON.stringify(profile) == "{}") {
      //TODO user isn't loaded after initial login so undefined error is thrown
      userProfile.name = user.fullName;
      userProfile.email = user.email;
    }

    let rides: string = "";
    monday == "Riding" ? rides += "1" : rides += "0";
    tuesday == "Riding" ? rides += "1" : rides += "0";
    wednesday == "Riding" ? rides += "1" : rides += "0";
    thursday == "Riding" ? rides += "1" : rides += "0";
    friday == "Riding" ? rides += "1" : rides += "0";
    saturday == "Riding" ? rides += "1" : rides += "0";
    sunday == "Riding" ? rides += "1" : rides += "0";

    userProfile.rideDays = rides;

    alert(JSON.stringify(userProfile));

    //TODO this is throwing error
    //dispatch(updateProfile(userProfile));
  };

  //local variable for displaying ride options for each day
  let rideOptions = ["Not Riding", "Riding"];

  //render the form
  return (
    <div className={"registerContainer"}>
      <div className={"formContainer"}>
        <h1>Update Address</h1>
        <Form onSubmit={handleAddressSubmit}>
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
                {states.map((value) => {
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
          <FormGroup row>
            <Col>
              <Button className={"submitButton"} type="submit">
                Update
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>

      <div className={"formContainer"}>
        <h1>Choose Ride Days</h1>
        <Form onSubmit={handleDaySubmit}>
          <FormGroup row>
            <Label for="monday" sm={3}>
              Monday
            </Label>
            <Col>
              <Input
                type="select"
                name="monday"
                id="monday"
                value={monday}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMonday(e.target.value)
                }
                sm={9}
              >
                {rideOptions.map((value, key) => (
                  <option key={key}>{value}</option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="tuesday" sm={3}>
              Tuesday
            </Label>
            <Col>
              <Input
                type="select"
                name="tuesday"
                id="tuesday"
                value={tuesday}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTuesday(e.target.value)
                }
                sm={9}
              >
                {rideOptions.map((value, key) => (
                  <option key={key}>{value}</option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="wednesday" sm={3}>
              Wednesday
            </Label>
            <Col>
              <Input
                type="select"
                name="wednesday"
                id="wednesday"
                value={wednesday}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setWednesday(e.target.value)
                }
                sm={9}
              >
                {rideOptions.map((value, key) => (
                  <option key={key}>{value}</option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="thursday" sm={3}>
              Thursday
            </Label>
            <Col>
              <Input
                type="select"
                name="thursday"
                id="thursday"
                value={thursday}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setThursday(e.target.value)
                }
                sm={9}
              >
                {rideOptions.map((value, key) => (
                  <option key={key}>{value}</option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="friday" sm={3}>
              Friday
            </Label>
            <Col>
              <Input
                type="select"
                name="friday"
                id="friday"
                value={friday}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFriday(e.target.value)
                }
                sm={9}
              >
                {rideOptions.map((value, key) => (
                  <option key={key}>{value}</option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="saturday" sm={3}>
              Saturday
            </Label>
            <Col>
              <Input
                type="select"
                name="saturday"
                id="saturday"
                value={saturday}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSaturday(e.target.value)
                }
                sm={9}
              >
                {rideOptions.map((value, key) => (
                  <option key={key}>{value}</option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="sunday" sm={3}>
              Sunday
            </Label>
            <Col>
              <Input
                type="select"
                name="sunday"
                id="sunday"
                value={sunday}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSunday(e.target.value)
                }
                sm={9}
              >
                {rideOptions.map((value, key) => (
                  <option key={key}>{value}</option>
                ))}
              </Input>
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

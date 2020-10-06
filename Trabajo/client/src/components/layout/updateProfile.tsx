import { stringify } from "querystring";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { isConstructorDeclaration } from "typescript";
import states from "../../json/states.json";
import { register } from "../../store/user";

interface updateProfileProps {}

interface updateProfileState {
  phone: number;
  address: string;
  city: string;
  state: string;
}

export const UpdateProfile: React.FC<updateProfileProps> = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [monday, setMonday] = useState("Not Riding");
  const [tuesday, setTuesday] = useState("Not Riding");
  const [wednesday, setWednesday] = useState("Not Riding");
  const [thursday, setThursday] = useState("Not Riding");
  const [friday, setFriday] = useState("Not Riding");
  const [saturday, setSaturday] = useState("Not Riding");
  const [sunday, setSunday] = useState("Not Riding");

  let handleAddressSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let alertMessage = `address: ${address}\n`;
    alertMessage += `city: ${city}\n`;
    alertMessage += `state: ${state}`;
    alertMessage += `zip: ${parseInt(zip)}`;
    alert(`TODO, send form to api:\n${alertMessage}`);
  };

  let handleDaySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let alertMessage = `monday: ${monday}\n`;
    alertMessage += `tuesday: ${tuesday}\n`;
    alertMessage += `wednesday: ${wednesday}\n`;
    alertMessage += `thursday: ${thursday}\n`;
    alertMessage += `friday: ${friday}\n`;
    alertMessage += `saturday: ${saturday}\n`;
    alertMessage += `sunday: ${sunday}`;
    alert(`TODO, send form to api:\n${alertMessage}`);
  };

  let rideOptions = ["Not Riding", "Riding"];

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

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

export const updateProfile: React.FC<updateProfileProps> = () => {
  let address: string = "";
  let city: string = "";
  let state: string = "Select State";

  let handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "address":
        address = e.target.value;
        break;
      case "city":
        city = e.target.value;
        break;
      case "state":
        state = e.target.value;
        break;
      default:
        console.error("Unknown event has occured");
    }
  };

  let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let alertMessage = `email: ${address}\n`;
    alertMessage += `password: ${city}\n`;
    alert(`TODO, send form to api:\n${state}`);
  };

  return (
    <div>
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
              handleStateChange(e)
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
              handleStateChange(e)
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
              handleStateChange(e)
            }
            sm={1}
          >
            {states.map((value) => {
              return <option key={value}>{value}</option>;
            })}
          </Input>
        </Col>
      </FormGroup>
    </div>
  );
};
